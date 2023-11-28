
// MyScene1クラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MyScene extends Phaser.Scene {

    // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
    constructor() {
        super({ key: 'MyScene', active: true });
    }

    // シーンの事前読み込み処理
    preload() {
         // 画像の読み込み(使用する時の名前, パス)
        this.load.image('sky', 'assets/sky.png');
        this.load.image('alien1', 'assets/alien1.png');
    }

    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(D_WIDTH/2, D_HEIGHT/2, 'sky');
        this.add.image(D_WIDTH/2, D_HEIGHT/2, 'alien1');
        this.text = this.add.text(10, 10, 'Scene 1').setFontSize(32).setColor('#ff0');
    }
    
  // 毎フレーム実行される繰り返し処理
    update() {
    }

}