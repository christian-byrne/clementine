
socialIcons = [
    {
      "url":"https://simpleicons.org/icons/instagram.svg",
      "alt":"Instagram"
    },
    {
      "url":"https://simpleicons.org/icons/twitter.svg",
      "alt":"Twitter"
    },
    {
      "url":"https://simpleicons.org/icons/tiktok.svg",
      "alt":"TikTok"
    },
    {
      "url":"https://simpleicons.org/icons/facebook.svg",
      "alt":"Facebook"
    },
    {
      "url":"https://simpleicons.org/icons/linkedin.svg",
      "alt":"LinkedIn"
    },
    {
      "url":"https://simpleicons.org/icons/pinterest.svg",
      "alt":"Pinterest"
    },
    {
      "url":"https://simpleicons.org/icons/youtube.svg",
      "alt":"YouTube"
    },
    {
      "url":"https://simpleicons.org/icons/snapchat.svg",
      "alt":"Snapchat"
    },
    {
      "url":"https://simpleicons.org/icons/whatsapp.svg",
      "alt":"WhatsApp"
    },
    {
      "url":"https://simpleicons.org/icons/discord.svg",
      "alt":"Discord"
    }
]



# import the current all users json file (/home/c_byrne/school/courses/game310/final-project/wardrobe/src/data/users/all.json)
import json
import random

with open('/home/c_byrne/school/courses/game310/final-project/wardrobe/src/data/users/all.json', 'r') as f:
    initial_object = json.load(f)


for i in range(len(initial_object['members'])):
    # Random number and random selection of social icons, but not less than 3
    num = random.randint(3, 10)
    initial_object['members'][i]['socialIcons'] = random.sample(socialIcons, num)

# write the updated all_users json a local json file
with open('all-users-with-props.json', 'w') as f:
    json.dump(initial_object, f, indent=4)