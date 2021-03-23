(() => {
	const root = document.documentElement;
	const style = getComputedStyle(root);
	const len = +style.getPropertyValue("--length");
	const length = len % 2 ? len : len + 1;
	const section = document.createElement("section");
	const list = document.createElement("ul");
	const item = document.createElement("li");
	const items = Array.from({ length }, () => item.cloneNode());

	document.body
		.appendChild(section)
		.appendChild(list)
		.append(...items);
})();