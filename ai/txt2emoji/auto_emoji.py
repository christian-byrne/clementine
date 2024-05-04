from transformers import BartTokenizer, BartForConditionalGeneration

class AutoEmoji:
    def __init__(self):
        self.model_path = "KomeijiForce/bart-large-emojilm"
        self.tokenizer = BartTokenizer.from_pretrained(self.model_path)
        self.generator = BartForConditionalGeneration.from_pretrained(self.model_path)

    def translate(self, sentence, num_beams=4, do_sample=True, max_length=100, **argv):
        inputs = self.tokenizer(sentence, return_tensors="pt")
        generated_ids = self.generator.generate(inputs["input_ids"], num_beams=num_beams, do_sample=do_sample, max_length=max_length, **argv)
        decoded = self.tokenizer.decode(generated_ids[0], skip_special_tokens=True).replace(" ", "")
        return decoded

