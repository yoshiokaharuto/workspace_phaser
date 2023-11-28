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
         // 画像の読み込み(使用する時の名前, パス)
        this.load.image('sky', 'assets/sky.png');
        this.load.image('back', 'assets/back.png');
        this.load.image('ground', 'assets/ground.png');//w:480,h:32
        this.load.image('alien1', 'assets/alien1.png');
        this.load.image('alien2', 'assets/alien2.png');
        this.load.image('alien3', 'assets/alien3.png');
        this.load.image('platform', 'assets/platform.png');//w:400,h:32
        this.load.image('block', 'assets/block.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('coin', 'assets/coin.png');
    }

    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(400, 300, 'sky');
        // 星を(200,200)に追加
        this.add.image(200, 200, 'star');
        // Player1の画像を物理演算を持った画像にする
        const player1 = this.physics.add.sprite(500, 350, 'alien1');
        // MainSceneクラスのプロパティにplayerを設定
        this.player1 = player1
        // Player3の画像を物理演算を持った画像にする
        const player2 = this.physics.add.sprite(500, 150, 'alien2');
        // MainSceneクラスのプロパティにplayerを設定
        this.player2 = player2

        ///WASDキーを検知できるようにする
        this.keys = {};
        this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //タイマー
        this._timeCounter = 0;  
        //残り時間
        this._leftTime = 10;   
        //文字列
        this._leftTimeText = this.add.text(300, 30, 'Time: ' + this._leftTime, { fontSize: '28px', fill: '#FFF' }); //時間表示
        // カウントダウンタイマーを稼働させるか判定するフラグ
        this.countdounTimer = true;

        // 動かない物体をまとめる
        let staticGroup = this.physics.add.staticGroup();
        // スケーリングする場合は再描画を指示する
        staticGroup.create((480*2)/2, D_HEIGHT-16,'ground').setScale(2,1).refreshBody();
        staticGroup.create(600, D_HEIGHT-150,'platform').setScale(0.5,1).refreshBody();;
        staticGroup.create(200,D_HEIGHT-100,'block');
        staticGroup.create(300,D_HEIGHT-150,'block');
        staticGroup.create(400,D_HEIGHT-200,'block');
        this.physics.add.collider(player1, staticGroup);// 静止物の衝突処理を設定する

        let coinGroup = this.physics.add.group();// 動く物体をまとめる
        coinGroup.create(200,D_HEIGHT-135, 'coin');// コイン1
        coinGroup.create(300,D_HEIGHT-185, 'coin');// コイン2
        coinGroup.create(400,D_HEIGHT-235, 'coin');// コイン3
        
        // クラスメンバに変更
        this.starGroup = this.physics.add.group();// 動く物体をまとめる
        this.starGroup.create(550,D_HEIGHT-180, 'star');// 星1
        this.starGroup.create(600,D_HEIGHT-180, 'star');// 星2
        this.starGroup.create(650,D_HEIGHT-180, 'star');// 星3
        
        // スコア
        this.score=0;
        //スコア表示
        this.scoreText =  this.add.text(20, 30, 'Score: ' + this.score, { fontSize: '28px', fill: '#FFF' }); 
        // ゲームクリアを判定するフラグ
        this.gameClear=false;

        // コインに衝突したら実行する
        this.physics.add.overlap(player1, coinGroup, collectCoin, null, this);
        function collectCoin(p,coin){
            coin.destroy();// コインを消す
        }
        // 星に衝突したら実行する
        this.physics.add.overlap(player1, this.starGroup, this.collectStar, null, this);
    }

    // 星を取った場合の処理
    collectStar(p,star){  

        // 星を消す
        star.destroy();
        // オブジェクトを再利用したい場合は、disableBodyでいったん画面から消す
        // star.disableBody(true, true);

        //  スコアの加算とscoreTextの更新
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        
        // starGroupに残っている星の数
        if ( this.starGroup.countActive(true) === 0)
        {
            console.log("star remain :"+this.starGroup.countActive(true));
            this.gameClear=true;
        }
        
     }

    //矢印キーで移動 
    arrow_move(cursors, object){
    
        if(cursors.up.isDown){
            // console.log("Up!!");
            object.setVelocityY(-200);// 上方向の速度を設定
            
        }else if(cursors.down.isDown){
            // console.log("down!!");
            object.setVelocityY(200);// 下方向の速度を設定
    
        }else if(cursors.left.isDown){
            // console.log("Left");
            object.setVelocityX(-200);// 左方向の速度を設定
    
    
        }else if(cursors.right.isDown){
            // console.log("Right!!");
            object.setVelocityX(200);// 右方向の速度を設定
    
        }else{
            object.setVelocity(0,0);// 横方向の速度を0
        }
    }

    //wasdキーで移動
    wasd_move(keys, object){

        if(keys.keyW.isDown){ //Wが押されている 
            console.log("Up!!");
            object.setVelocityY(-200);// 上方向の速度を設定
    
        }else if(keys.keyS.isDown){  //Sが押されている時 
            console.log("Down!!");
            object.setVelocityY(200);// 下方向の速度を設定
    
        }else if(keys.keyA.isDown){  //Aが押されている時
            console.log("Left!");
            object.setVelocityX(-200);// 左方向の速度を設定
    
        }else if(keys.keyD.isDown){ //Dが押されている時 
            console.log("Right!");
            object.setVelocityX(200);// 右方向の速度を設定
    
        }else{
            object.setVelocity(0,0);// 横方向の速度を0
        }
    }
    
    countdown(delta){
        // 毎フレーム事にタイマーを更新
        this._timeCounter += delta;
        // _timeCounterが1000になった1秒
        if(this._timeCounter > 1000) {
            // 1000ミリ秒経過したのでカウンターをリセット
            this._timeCounter = 0;
            // 残り時間を減らす
            this._leftTime --;
            // テキストを更新する
            this._leftTimeText.setText('Time: ' + this._leftTime);
        }
        if(this._leftTime <= 0) {
            // this._leftTime=30;
            this.quitGame();
        }
    }

    // ゲームオーバー処理
    quitGame(){
        this.add.text(D_WIDTH/3,D_HEIGHT*1/3, 'Game Over!', { fontSize: '32px', fill: '#CDC' });
         // 色合いを変える
        this.player1.setTint(0x999999);
        this.player2.setTint(0xaaaaaa);
          //物理エンジンを止める
        this.physics.pause();
        //カウントダウンタイマーを止めるためにフラグをfalseにする
        this.countdounTimer = false;
        return;
    }

     // 毎フレーム実行される繰り返し処理
    update(time, delta) {
        // // キーボードの情報を取得
        let cursors = this.input.keyboard.createCursorKeys();

        this.arrow_move(cursors, this.player1);//矢印キーによるplayer1の移動
        this.wasd_move(this.keys, this.player2);//WASDキーによるplayer2の移動
        
        //ゲームクリアでなかった制限時間設定
        if(this.countdounTimer) this.countdown(delta);

        // ゲームクリア判定
        if (this.gameClear){
            console.log("Game Clear!")
            //物理エンジンを止める
            this.physics.pause();
            // テキストを表示する
            this.add.text(D_WIDTH/3,D_HEIGHT*1/3, 'Game Clear', { fontSize: '32px', fill: '#FFF' });
            this.countdounTimer = false;
            return;
        }         

    }

}

