# We are creating this:
    # {
    #     "id": 21,
    #     "name": "Wednesday Addams",
    #     "username": "wednesdayA",
    #     "profilePicSrc": "https://randomuser.me/api/portraits",
    #     "email": "wednesdayA@gmail.com",
    #     "phone": "555-555-5555",
    #     "score": 192039,
    #     "averageRating": 4.6,
    #     "totalRatings": 943,
    #     "modelCount": 6,
    #     "favorites": 999,
    #     "likes": 192234,
    #     "views": 43002394
    #     "downloads": 432,
    #     "joinDate": "November 23, 2022",
    #     "lastActive": "November 23, 2022",
    #     "location": ", "Westfield, NJ",
    #     "badgeCount": 15,
    #     "achievementCount": 5
    #     "titleCount": 5
    # },
# We use the names (comma separated) as starting points. The username is the first letter of the first name and the last name. The email is the username + @gmail.com. The profilePicSrc is a random image from the randomuser.me API. The joinDate and lastActive are random dates. The location is a random location in the US. The badgeCount, achievementCount, and titleCount are random numbers. The rest of the fields are random numbers.

# We will use the randomuser.me API to get the profilePicSrc. We will use the faker library to generate the random data.

import faker
import json
fake = faker.Faker()
ret = []

for name in names:
    name = name.strip()
    first_name = name.split(" ")[0]
    if len(name.split(" ")) > 2:
        last_name = name.split(" ")[2]
    elif len(name.split(" ")) == 1:
        last_name = ""
    else:
        last_name = name.split(" ")[1]
    username = first_name[0].lower() + last_name.lower()
    email = username + "@gmail.com"
    profilePicSrc = f"{name.replace(' ', '-').lower()}.png"
    joinDate = fake.date_this_year()
    # convert date to string in format "Month day, year"
    joinDate = joinDate.strftime("%B %d, %Y")
    lastActive = fake.date_this_year()
    lastActive = lastActive.strftime("%B %d, %Y")

    location = fake.city() + ", " + fake.state_abbr()
    badgeCount = fake.random_int(0, 20)
    achievementCount = fake.random_int(0, 20)
    titleCount = fake.random_int(0, 20)
    ret.append({
        "id": fake.random_int(0, 100),
        "name": name,
        "username": username,
        "profilePicSrc": profilePicSrc,
        "email": email,
        "phone": fake.phone_number(),
        "score": fake.random_int(0, 1000000),
        "averageRating": fake.random_int(0, 5),
        "totalRatings": fake.random_int(0, 1000),
        "modelCount": fake.random_int(0, 100),
        "favorites": fake.random_int(0, 1000),
        "likes": fake.random_int(0, 1000000),
        "views": fake.random_int(0, 100000000),
        "downloads": fake.random_int(0, 1000),
        "joinDate": joinDate,
        "lastActive": lastActive,
        "location": location,
        "badgeCount": badgeCount,
        "achievementCount": achievementCount,
        "titleCount": titleCount
    })

# write to random-users-output.json as json object
with open('random-users-output.json', 'w') as f:
    json.dump(ret, f, indent=4)

print(ret)