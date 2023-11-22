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

        this.player = this.add.image(400,300,'alien1');
        this.player_direction = 1
    }
    // 毎フレーム実行される繰り返し処理
    update(){
        // キーボードの情報を取得
        let cursors = this.input.keyboard.createCursorKeys();
        if (cursors.up.isDown) {
        //console.log("Up!");
        this.player.y -= 3;// 上方向に移動
        } else if (cursors.down.isDown) {
        //console.log("Down!");
        this.player.y += 3;// 下方向に移動
        } else if (cursors.left.isDown) {
        //console.log("Left!");
        this.player.x -= 3;// 左方向に移動
        } else if (cursors.right.isDown) {
        //console.log("Right!");
        this.player.x += 3;// 右方向に移動
        } 
    }

}