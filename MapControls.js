THREE.MapControls = function(camera, domElement) {
	var _this = this;
	var STATE = {
		NONE: 0,
		ROTATE: 1,
		PAN: 2,
		ZOOM: 3
	};
	this.state = STATE.NONE;
	this.camera = camera;
	this.domElement = domElement;

	this.mousedown = function(event) {
		if(event.button == 0) {
			_this.state = STATE.PAN;
		} else if(event.button == 1) {
			_this.state = STATE.ZOOM;
		} else if (event.button == 2) {
			_this.state = STATE.ROTATE;
		}
	};

	this.mousemove = function(event) {
		event.movementX = event.movementX || event.webkitMovementX || event.mozMovementX;
		event.movementY = event.movementY || event.webkitMovementY || event.mozMovementY;

		if(_this.state == STATE.ROTATE) {

		} else if(_this.state == STATE.PAN) {
			var offset = new THREE.Vector3(event.movementX, -event.movementY, 0);
			offset.multiplyScalar(1 / (64 - _this.camera.position.z));
			offset.applyAxisAngle(new THREE.Vector3(0, 0, 1), _this.camera.rotation.z);

			_this.camera.position = _this.camera.position.sub(offset);
		} else if(_this.state == STATE.ZOOM) {			
			if(event.movementY < 0 && _this.camera.position.z > 3 || event.movementY > 0 && _this.camera.position.z < 9) {
				_this.camera.position = new THREE.Ray(_this.camera.position, new THREE.Vector3(0, 0, 1).applyEuler(_this.camera.rotation).normalize(), 0, 100).at(event.movementY / 5);
			}
		}
	};

	this.mouseup = function(event) {
		_this.state = STATE.NONE;
	};

	this.domElement.addEventListener('mousedown', this.mousedown);
	this.domElement.addEventListener('mousemove', this.mousemove);
	this.domElement.addEventListener('mouseup', this.mouseup);
	this.domElement.addEventListener('mousewheel', function(event) {
		_this.state = STATE.ZOOM;
		_this.mousemove({
			movementY: event.wheelDeltaY / -12
		});
		_this.state = STATE.NONE;
	});
	this.domElement.addEventListener('DOMMouseScroll', function(event) {
		_this.state = STATE.ZOOM;
		_this.mousemove({
			movementY: event.detail
		});
		_this.state = STATE.NONE;
	});
	this.domElement.addEventListener('contextmenu', function(event) {
		event.preventDefault();
		return false;
	});
}