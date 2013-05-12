(function () {
	//原点のX座標
	var originX = 30;
	//原点のY座標
	var originY = 30;
	//X座標の基準点（CSSの代入先）
	var positionX = "left";
	//Y座標の基準点（CSSの代入先）
	var positionY = "bottom";
	//エレメントのオフセット幅の値（＝エレメントの幅の半分）
	var offsetX;
	//エレメントのオフセット幅の値（＝エレメントの高さの半分）
	var offsetY;
	//原点からの距離（円の半径）
	var radius = 200;
	//どの範囲に分布させるか、角度
	var range = 90;
	//何度から範囲をスタートするか
	var rangeStart = 0;
	//範囲内にエレメントを配置した場合の個別の角度
	var perDeg;
	//ボタンのエレメント
	var button;
	//配置する要素
	var children = [];
	//要素ごとのX座標
	var childrenX = [];
	//要素ごとのY座標
	var childrenY = [];
	//要素の元X座標
	var childX = 10;
	//要素の元Y座標
	var childY = 10;
	//要素ごとのアニメーションのディレイ
	var delay = 20;
	var isOpening = false;
	$(document).ready(function () {
		PathMenu.getElements().initialize().setEvents();
	});
	//pはただのショートカット
	var PathMenu = p = {
		getElements: function () {
			children = document.getElementsByClassName("child");
			button = document.getElementById("button");
			return this;
		},
		initialize: function () {
			//オフセット値を算出
			offsetX = children[0].offsetWidth / 2;
			offsetY = children[0].offsetHeight / 2;
			//1エレメントあたりの角度を算出
			perDeg = 90 / (children.length - 1);
			for (var i = 0, len = children.length; i < len; i ++) {
				var deg = i * perDeg;
				//移動後の座標を算出して代入
				childrenX[i] = p.getPositionFromRadDeg(radius, deg, "x") - offsetX + originX;
				childrenY[i] = p.getPositionFromRadDeg(radius, deg, "y") - offsetY + originY;
			}
			return this;
		},
		setEvents: function () {
			$(button).click(function () {
				if (isOpening) {
					$.each(children, function (index, child) {
						//一斉に開くのではなく、ちょっとずらす
						var d = index * delay;
						$(child).transition({rotate:"300deg", delay:d}, 300, "in")
							.transition({rotate:"360deg", left:childX, bottom:childY}, 300, "easeInQuart");
					});
					isOpening = false;
				} else {
					$.each(children, function (index, child) {
						var d = index * delay;
						$(child).transition({rotate:"0deg"}, 0)
							//バウンスさせるためにベジェを使う
							.transition({left:childrenX[index], bottom:childrenY[index], delay:d}, 300, "cubic-bezier(0.250, 0.250, 0.500, 1.200)");
					});
					isOpening = true;
				}
			});
			return this;
		},
		//半径と角度で座標を出す
		getPositionFromRadDeg: function (radius, deg, xy) {
			var radian = deg * (Math.PI / 180);
			if (xy == "x") {
				return radius * Math.cos(radian);

			} else if (xy == "y") {
				return radius * Math.sin(radian);
			}
		}
	}
})();