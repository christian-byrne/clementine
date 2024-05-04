from pathlib import Path
from PIL import Image

try:
    import torch
except ImportError:
    raise ImportError("Use pyenv local 3.10.6 please")
from transformers import (
    BlipProcessor,
    BlipForConditionalGeneration,
    BlipConfig,
    BlipTextConfig,
    BlipVisionConfig,
)
from typing import Tuple, List


class AutoCaptioner:
    def __init__(
        self,
        search_beams: int = 5,
        exclude_terms: List[str] = [],
        max_resolution: int = 512,
    ):
        self.search_beams = search_beams
        # https://huggingface.co/Salesforce/blip-image-captioning-large/discussions/20
        self.exclude_terms = exclude_terms + ["arafed"]
        self.max_resolution = max_resolution

    def __call__(
        self,
        img_path: Path,
        conditional_caption: str,
        min_words: int,
        max_words: int,
        temperature: float = 0.8,
        repetition_penalty: float = 1.2,
        include_conditional_caption: bool = True,
    ) -> None:
        raw_img = Image.open(img_path).convert("RGB")
        if (
            raw_img.size[0] > self.max_resolution
            or raw_img.size[1] > self.max_resolution
        ):
            raw_img = raw_img.resize((self.max_resolution, self.max_resolution))

        general_caption = self.general_caption(
            raw_img,
            conditional_caption,
            min_words,
            max_words,
            temperature,
            repetition_penalty,
            self.search_beams,
        )

        if not include_conditional_caption:
            general_caption = general_caption.replace(conditional_caption, "")

        return self.__exclude_terms(general_caption, self.exclude_terms)

    def __exclude_terms(self, caption: str, exclude_list: List[str]) -> str:
        if not exclude_list:
            return caption
        return self.__exclude_terms(
            caption.replace(exclude_list[0], " "),
            exclude_list[1:] if len(exclude_list) > 1 else [],
        )

    def set_conditional_caption(self, conditional_caption: str) -> None:
        self.conditional_image_captioning = conditional_caption

    def general_caption(
        self,
        rgb_input_image: Image.Image,
        conditional_caption: str,
        min_words: int,
        max_words: int,
        temperature: float,
        repetition_penalty: float,
        threads: int,
    ) -> str:
        model_path = "Salesforce/blip-image-captioning-large"
        processor = BlipProcessor.from_pretrained(model_path)

        # https://huggingface.co/docs/transformers/model_doc/blip#transformers.BlipTextConfig
        text_config_kwargs = {
            "max_length": max_words,
            "min_length": min_words,
            "num_beams": threads,
            "temperature": temperature,
            "repetition_penalty": repetition_penalty,
            "padding": "max_length",
        }
        config_text = BlipTextConfig.from_pretrained(model_path)
        config_text.update(text_config_kwargs)
        config_vision = BlipVisionConfig.from_pretrained(model_path)
        # https://huggingface.co/docs/transformers/model_doc/blip#transformers.BlipConfig
        config = BlipConfig.from_text_vision_configs(config_text, config_vision)

        # Update model configuration
        model = BlipForConditionalGeneration.from_pretrained(model_path, config=config)
        model = model.to("cuda")

        inputs = processor(
            rgb_input_image,
            conditional_caption,
            return_tensors="pt",
            # truncation="longest_first", # longest_first, only_first, only_second, do_not_truncate
        ).to("cuda")

        out = model.generate(**inputs)
        out_string = processor.decode(out[0], skip_special_tokens=True)

        return out_string
