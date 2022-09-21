import domtoimage from 'dom-to-image';

export function nodeToPng(node: HTMLElement, imageScale = 8): Promise<Blob> {
	return domtoimage.toBlob(node, {
		width: node.clientWidth * imageScale,
		height: node.clientHeight * imageScale,
		style: {
			transform: `scale(${imageScale})`,
			transformOrigin: 'top left'
		}
	});
}

export function downloadNodeAsPng(nodeIds: string[], imageScale = 8) {
	for (const nodeId of nodeIds) {
		const node = document.getElementById(nodeId);
		if (!node) return;
		nodeToPng(node, imageScale).then((blob) => {
			const a = document.createElement('a');
			const url = URL.createObjectURL(blob);
			a.href = url;
			a.download = nodeId + '.png';
			document.body.appendChild(a);
			a.click();
			setTimeout(function () {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			}, 0);
		});
	}
}
