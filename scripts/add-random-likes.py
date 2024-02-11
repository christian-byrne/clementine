import json
import random
import faker
from faker import Faker

# create a faker instance
fake = Faker()
# load the database

database = "/home/c_byrne/school/courses/game310/final-project/wardrobe/src/data/photos/all.json"

names_raw = "Arwen Undómiel, Fran Walsh, Amber Waves, Becky Barnett, Luisa Rey, Leslie Matos, Ava, Kyoko, Briony Tallis, Lola Quincy, Cecilia Tallis, Claudia Wilson Gator, Linda Partridge, Virginia Woolf, Harmony Faith Lane, Harry Lockhart, Kate Mercer, Alejandro Gillick, Lady Bird, Patrick Bateman, Paul Allen, Evelyn Williams, Angela Hayes, Ricky Fitts, Lester Burnham, Terence Fletcher, Luke Glanton, Avery Cross, Jason Glanton, Romina Mendes, Lee Chandler, Joe Chandler, Randi Chandler, Elaine Robinson, Benjamin Braddock, Mrs. Robinson, Rosemary Woodhouse, Ben Bradlee, Bob Woodward, Rick Blaine, Victor Laszlo, Ilsa Lund, Annina Brandel, Cass Sheppard, Anya Thorensen, Josie Radek, Lena Double, Dwayne Hoover, Olive Hoover, Frank Ginsburg, Jim Sullivan, Michael Rezendes, Sacha Pfeiffer, Sgt. William James, Ramona Flower, Scott Pilgrim, Julie Powers, Steven Murphy, Anna Murphy, Clementine Kruczynski, Joel Barish, Travis Bickle, Tom Hansen, Summer, Jake Gittes, Ida Sessions, Evelyn Cross Mulwray, Lisa Rowe, Daisy Randone, Susanna Kaysen, Frank Costello, Colin Sullivan, Barry Egan, Lena Leonard, Juno MacGuff, Pat Solitano, Imperator Furiosa, Gogo Yubari, O-Ren Ishii, Elle Driver, Vernita Green,  Paul Atreides, Park Dong-ik, Waymond Wang, Evelyn Quan Wang, Robert Neville, Joanna Anderson, Billy Mack, Ramiz Rafi Mirza, Robin Swift, Mookie, Roger Verbal Kint, Keyser Soze, Mona Lisa Vito, Vinny Gambini, Jenny Carey Mulligan, Elizabeth Shaw, Ellen Ripley, Louise Banks, Olivia Dunham, Zoe Washburne, Kathryn Janeway, Dana Scully, Buffy Summers, Laura Roslin, Sarah Connor, Kara Thrace, Cherry Darling, Vivian Ward, Samantha Baker, Stifler's Mom, Marquise de Merteuil, Karen Silkwood, Marnie Edgar, Briony Tallis, Gilda Mundson Farrell, Matty Walker, Annie Savoy, Sverine Serizy, Gloria Swenson, Catherine Tramell, Phyllis Dietrichson, Bess McNeil, Thelma Dickinson, Alabama Whitman, Annie Porter, Marge Gunderson, Elisabet Vogler, Sally Albright, Bonnie Parker, Ada McGrath, Shoshanna Dreyfus, Alice Hyatt, Lee Holloway, Mildred Pierce, Margo Channing, Adrian Pennino Balboa, Judy Barton, Madeleine Elster, Debby Marsh, Amelie, Alex Forrest, Blanche Dubois, Paikea Apirana, Margot Tenenbaum, Holly Golightly, Mia Williams, Jessica Rabbit, Betty Elms, Diane Selwyn, Scarlett O'Hara, Louise Sawyer, Nina Sayers, Veronic Sawyer, Mia Wallace, Clarice Starling, Laurie Strode, Carrie White, Bridget Gregory, Lisbeth Salander, Jackie Brown, Sugar Kane Kowalcyzk, Hildy Johnson, Annie Hall"

new_database = []
# add a likes, favorites, and creator field to each photo
with open(database, 'r') as f:
    database = json.load(f)
    for photo in database:
        # likes, favorites, downloads, shared, views should be randomized
        photo["likes"] = random.randint(0, 1000)
        photo["favorites"] = random.randint(0, 1000)
        photo["downloads"] = random.randint(0, 1000)
        photo["shared"] = random.randint(0, 1000)
        photo["views"] = random.randint(0, 100000)
        # date created should be randomized (in past 2 years)
        random_date_created = fake.date_this_year()
        # put date in format "Month day, year"
        photo["dateCreated"] = random_date_created.strftime("%B %d, %Y")
        if "wednesday" in photo["model"].lower() or "goth" in photo["model"].lower():
            photo["creator"] = "Wednesday Addams"
        elif "space" in photo["model"].lower():
            photo["creator"] = "Angela Hayes"
        elif "futurism" in photo["model"].lower():
            photo["creator"] = "Lady Bird"
        elif "lonely" in photo["model"].lower():
            photo["creator"] = "Luv Nexus-9"
        else:
            # get random name from names_raw
            names = names_raw.split(",")
            random_name = random.choice(names).strip()
            photo["creator"] = random_name
        new_database.append(photo)

# shuffle the database
random.shuffle(new_database)

# write the new database to a json
with open('photos-database.json', 'w') as f:
    json.dump(new_database, f)

print("Likes added")
