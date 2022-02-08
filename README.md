# MSP1-Browser-Game
Creating an internet browser game with HTML, CSS and Javascript. This Readme file will be constantly updated as the project is designed and developed.

Initial Requirements:

1/29/22:
- Come up with Project idea
    Game ideas:
        -Dungeon Crawler - similar to choose your own adventure
        -Pong
        -Flappy Bird
        -Space shooter kind of game
        -Platformer
        

    Game requirements:
        -Build basic HTML layout with semantic tags for organization
        -Perhaps a Canvas element for 2d games

    Game layout: 

    Pseudocoding:

- Create a project repository on Github 
    
    - Completed 1/29 with basic repo structure. Assets folder for any potential pictures, sounds, etc...  created. One file for each language created in main directory.

1/31/22:
- Going build a game called 'Block Adventurer!'
- The idea is to build a movable block object around a canvas element
    - Similar to Snake the longer the block avoids other objects your score continuously increases    
    - Perhaps start with block elements coming towards the main block.
    - Would be fun to have circles coming at the block as they would be the enemies. Will try an implement this given time
    - Some kind of Power-ups would be fun as a bonus. Maybe increased speed around the map, for example
    - Additional bonus would be splash screen to "select your hero" where end user can select a different colored block as their hero.

- Initial objectives 1/31
    - Build HTML template with Canvas element, top div for title header of game. 
    - Basic CSS styling so I can see where HTML elements are
    - Pseudocode some JS functions

2/2/22:
- Basic game structures created
- Working mainly in Javascript now
    - Created main variables for Canvas and drawing to Canvas
    - Laid out basic game logic
        - Created class for instantiating game object
        - Need to build out function for checking on collision between player and enemy. Reference Mozilla: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        - Need to build master function to draw everything onto Canvas

2/5/22:
- Javascript is 50% coded, working on main draw function to display all items on Canvas now

2/7/22:
- Javascript coding completed. All items working Saturday afternoon after debugging
- Began implementing some sound effects as well. Able to get background music and basic sound effects working
- Game needs a key or table to tell players how to play the game
- Need to try and do some additional styling

Update:
- Imported Google Fonts for basic styling
- Spent a super long time trying to implement an image background onto the Canvas element, but cannot get to work.
    -Believe the main issue is that ctx.clearRect is clearing canvas frame and clearing the background image
    -Could possibly make second Canvas element with just the image display on or behind the first Canvas element for the game