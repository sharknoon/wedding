import domtoimage from 'dom-to-image';

export function download(printIds: string[], scale = 8) {
	for (const printId of printIds) {
		const node = document.getElementById(printId);
		if (!node) return;
		domtoimage
			.toBlob(node, {
				width: node.clientWidth * scale,
				height: node.clientHeight * scale,
				style: {
					transform: `scale(${scale})`,
					transformOrigin: 'top left'
				}
			})
			.then((blob) => {
				const a = document.createElement('a');
				const url = URL.createObjectURL(blob);
				a.href = url;
				a.download = printId + '.png';
				document.body.appendChild(a);
				a.click();
				setTimeout(function () {
					document.body.removeChild(a);
					window.URL.revokeObjectURL(url);
				}, 0);
			});
	}
}
