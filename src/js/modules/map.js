export async function initMap() {
	const mapDiv = document.getElementById("map"); //* Оболочка яндекс карты
	const behaviors = ["drag", "pinchZoom", "dblClick"];

	//* Подключение пакетов и зависимостей
	const {
		YMap,
		YMapDefaultSchemeLayer,
		YMapDefaultFeaturesLayer,
		YMapMarker,
		YMapControls,
		YMapControlButton,
	} = window.ymaps3;
	const { YMapGeolocationControl, YMapZoomControl } =
		await window.ymaps3.import("@yandex/ymaps3-controls@0.0.1");
	const { YMapDefaultMarker } = await window.ymaps3.import(
		"@yandex/ymaps3-markers@0.0.1"
	);

	//* Controls
	const zoomControl = new YMapControls({ position: "left" });
	const geolocationControl = new YMapControls({
		position: "top left",
		orientation: "vertical",
	});
	const fullscreenControl = new YMapControls({ position: "top right" });

	//* Иницилиазируем карту
	const map = new YMap(
		//* Передаём ссылку на HTMLElement контейнера
		mapDiv,

		//* Передаём параметры инициализации карты
		{
			location: {
				center: [30.338928000000006, 59.943543564154155],
				zoom: 16,
			},
			//* Поведение карты
			behaviors,
		}
	)
		.addChild(new YMapDefaultSchemeLayer({ theme: "dark" })) //* Базовое наложение (обязательно)
		.addChild(new YMapDefaultFeaturesLayer()) //* Наложение для меток
		.addChild(zoomControl)
		.addChild(geolocationControl)
		.addChild(fullscreenControl);

	//* Добавляем базовые контролы
	geolocationControl.addChild(new YMapGeolocationControl());
	zoomControl.addChild(new YMapZoomControl());

	// DOM-элемент должен быть создан заранее, но его содержимое можно задать в любой момент.
	// const content = document.createElement('section');
	// const marker = new YMapMarker({
	// 	coordinates: [30.338928000000006, 59.943543564154155]
	// }, content);
	// content.innerHTML = '<h1 style="background:black;"><a href="#">Этот заголовок можно переносить</a></h1>';

	const defaultMarker = new YMapDefaultMarker({
		coordinates: [30.338928000000006, 59.943543564154155],
		// color: '#d4c17f', //* цвет базовой метки (можно менять в css)
		// title: 'LoftHouse',
		// subtitle: 'Жилой комплекс'
	});

	//* Добавляем маркер на карту
	map.addChild(defaultMarker);

	//* Добавляем иконку в кнопке как простой div элемент
	const fullScreenElement = document.createElement("div");
	fullScreenElement.className = "fullscreen";

	//* Событие fullscreenchange вызывается сразу после переключения браузера в полноэкранный режим или выхода из него.
	document.addEventListener("fullscreenchange", function () {
		fullScreenElement.classList.toggle("exit-fullscreen");
		fullScreenElement.classList.contains("exit-fullscreen")
			? behaviors.push("scrollZoom")
			: behaviors.pop();
		map.setBehaviors(behaviors);
	});

	function fullScreenBtnHandler() {
		//* document.fullscreenElement возвращает элемент, который в данный момент представлен в полноэкранном режиме в этом документе, или значение null, если полноэкранный режим в настоящее время не используется.
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			//* Метод element.requestFullscreen() выдает асинхронный запрос на отображение элемента в полноэкранном режиме.
			mapDiv.requestFullscreen();
		}
	}

	//* Add YMapControlButton that will enable or disable fullscreen mode
	const fullScreenBtn = new YMapControlButton({
		element: fullScreenElement,
		onClick: fullScreenBtnHandler,
	});

	fullscreenControl.addChild(fullScreenBtn);
}
