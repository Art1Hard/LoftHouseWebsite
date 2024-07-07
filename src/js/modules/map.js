export async function initMap() {

	const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls } = window.ymaps3;
	const { YMapGeolocationControl, YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
	const { YMapDefaultMarker } = await window.ymaps3.import('@yandex/ymaps3-markers@0.0.1');

	const controls = new YMapControls({ position: 'bottom' });
	const controls2 = new YMapControls({ position: 'top' })
	controls2.addChild(new YMapGeolocationControl());
	controls.addChild(new YMapZoomControl());

	// DOM-элемент должен быть создан заранее, но его содержимое можно задать в любой момент.
	const content = document.createElement('section');
	const marker = new YMapMarker({
		coordinates: [30.338928000000006, 59.943543564154155]
	}, content);

	let defaultMarker = new YMapDefaultMarker({
		coordinates: [30.338928000000006, 59.943543564154155],
		color: 'green'
	});

	// Иницилиазируем карту
	const map = new YMap(
		// Передаём ссылку на HTMLElement контейнера
		document.getElementById('map'),

		// Передаём параметры инициализации карты
		{
			location: {
				// Координаты центра карты
				center: [30.338928000000006, 59.943543564154155],
				// Уровень масштабирования
				zoom: 16
			}
		}
	)
		.addChild(new YMapDefaultSchemeLayer())
		.addChild(new YMapDefaultFeaturesLayer())
		.addChild(marker)
		.addChild(controls)
		.addChild(controls2);
	content.innerHTML = '<h1 style="background:black;"><a href="#">Этот заголовок можно переносить</a></h1>';
}