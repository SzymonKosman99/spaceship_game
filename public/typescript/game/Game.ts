import SpaceshipsFactory from './SpaceshipsFactory';

class Game {
    public start() {
        SpaceshipsFactory.createPlayerSpaceship();
        setInterval(() => {
            SpaceshipsFactory.createEnemySpaceship();
        }, 2000);
    }
}

export default Game;
