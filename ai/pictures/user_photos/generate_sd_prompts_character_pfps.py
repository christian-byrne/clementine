# import json list from prompt-gen-generated-character-tags.json as python list
import json

with open('prompt-gen-generated-character-tags.json', 'r') as f:
    data = json.load(f)

prompt_strings = []

for fictional_character in data: 
    template_string = f"Movie character {fictional_character['name']} in a Balenciaga fashion photoshoot, high fashion classy, glamorous glamour, full body shot, Versace, Vogue, intricate, set pieces, intricate set, vogue magazine [{', '.join(fictional_character['tags'])} :: 10] <lora:HP_Balenciaga:1> BalenciagaStyle, canon, dramatic, cinematic lighting, depth of field, bokeh, anamorphic lens flare, 8k, hyper detailed, 35mm film grain"

    prompt_strings.append(template_string)

# Write template strings line by line in text file named "sd_prompts-characters.txt"
with open('sd_prompts-characters.txt', 'w') as f:
    for prompt in prompt_strings:
        f.write("%s\n" % prompt)
