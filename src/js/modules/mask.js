import IMask from "imask";
const inputs = document.querySelectorAll('.phone-mask');

export const startMask = () => {
	if (inputs.length <= 0)
		return;

	for (let i = 0; i < inputs.length; i++) {
		IMask(
			inputs[i],
			{
				mask: '+{7} (000) 000-00-00'
			}
		)
	}
}