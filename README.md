# Simon-Project1

### Outline

This project was centered on the development of a functioning web simulation of a pattern memory game in the mold of the popular childrens' toy, _Simon_ and set to the theme of breaking down brick walls . Users will select from one of four options in reiterated order of a pattern prevously displyed automatically by the page.
The page loads immediately to the game board. All selectors remain inert until the player initiates a game sequence with the start button. In the meantime, the option to select a difficulty level (with viewable description) and a selectable information caption are present and active. 
When a game is started, a randomized array sequence is initiated and visually/audibly indicated with stylized color manipulation and audio ques activated to each of the four selectors uniquely. When the array sequence is completed, which is length dependent on the level (i.e. level 1 is a single selection, level 2 is two consecutive selections, and so on), the selectors are then active for the player to use. Upon a successful reiteration of the pattern by the player, the game board is triggered to respond visually and audibly that the turn is successfully completed, and the computer will then generate its newest length iteration of the pattern. If s the player should so choose an incorrectly placed selector, the game will trigger that it has ended and cease to proceed; at which point the player may reset and try again. Some features the player can enjoy during use are the inclusion of responsive level and high-score indicators, a special enhanced version of gameplay, and a displayed written response to the player's current performance. 

__live-site:__ (http://sleepy-ptolemy-790824.bitballoon.com/)

#### Wire Frames
![MVP](https://raw.githubusercontent.com/K-Ramberg/Simon-Project1/master/wire-frame-uploads/MVP-basic.png )

![Styled](https://raw.githubusercontent.com/K-Ramberg/Simon-Project1/master/wire-frame-uploads/added-style-desired-end-product.png)

#### Langauges & Libraries
- HTML5 
- CSS3
- Javascript
- JQuery
- Materialize

#### Other Sources
- Transparenttextures.com was used for the background textured styles
- Google fonts were used throughout; *Bangers* and *Special Elite* were used for the page styles, and the game-over element respectively
- soundboard tones tested from Peal.io

#### User Stories
Trello Board: (https://trello.com/b/kFULRFha/first-project)

#### Version Improvements 

 - In the next version of the game, I would like to implement enhanced styling to the cursor (including an animation upon click events). I would also like to   implement an animation of the wall breaking to fit better with the theme immersion. 
 - All audio ques should be improved and balanced.
 - The Page responsiveness needs to be improved at the < 850px width mark & give more consideration to mobile sizing.
 - Unique color attributes and shapes should be added to the board buttons. 
 - instructions should be revised, and written more concisely 
