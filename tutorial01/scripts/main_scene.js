// シーンクラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MainScene extends Phaser.Scene {
    // コンストラクタ
    constructor() {
        // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
        super('MainScene');
    }
    // シーンの事前読み込み処理
    preload() {
        this.load.image('sky', 'assets/sky.png');
         this.load.image('back', 'assets/back.png');
         this.load.image('ground', 'assets/platform.png');
         this.load.image('alien1', 'assets/alien1.png');
         this.load.image('alien2', 'assets/alien2.png');
         this.load.image('alien3', 'assets/alien3.png');
         this.load.image('platform', 'assets/platform.png');
         this.load.image('block', 'assets/block.png');
         this.load.image('bomb', 'assets/bomb.png');
         this.load.image('star', 'assets/star.png');
         this.load.image('coin', 'assets/coin.png');
    }
    // シーン初期化処理
    create() {
        // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(400, 300, 'sky');

        this.player1 = this.add.image(400,300,'alien1');
        this.player_direction1 = 1;

        this.player2 = this.add.image(400, 300, 'alien2');
        this.player_direction2 = 1;

        this.player3 = this.add.image(400, 300, 'alien2');
        this.player_direction3 = 1;
    }
    // 毎フレーム実行される繰り返し処理
    update() {
         if (this.player1.y >= D_HEIGHT - 100) this.player_direction1 = -1;
         if (this.player1.y <= 100) this.player_direction1 = 1;
         if (this.player_direction1 == 1) {
             this.player1.y += 10;
         } else {
             this.player1.y -= 10;
         }

         if (this.player2.x >= D_WIDTH - 100) this.player_direction2 = -1;
         if (this.player2.x <= 100) this.player_direction2 = 1;
         // プレイヤーの移動 
         if (this.player_direction2 == 1) {
             this.player2.x += 10;
         } else {
             this.player2.x -= 10;
         }

         if (this.player3.x >= D_WIDTH - 100) this.player_direction3 = -1;
         if (this.player3.x <= 100) this.player_direction3 = 1;
         // プレイヤーの移動 
         if (this.player_direction3 == 1) {
             this.player3.x += 10;
         } else {
             this.player3.x -= 10;
         }
         if (this.player3.y >= D_HEIGHT - 100) this.player_direction3 = -1;
         if (this.player3.y <= 100) this.player_direction3 = 1;
         // プレイヤーの移動 
         if (this.player_direction3 == 1) {
             this.player3.y += 10;
         } else {
             this.player3.y -= 10;
         }
    }

}