<script lang="ts">
	// General
	let pageCounter = 0;

	// Program
	const programItems = [
		{
			time: new Date(1970, 0, 1, 14),
			title: 'Kirchliche Trauung'
		},
		{
			time: new Date(1970, 0, 1, 15),
			title: 'Sektempfang'
		},
		{
			time: new Date(1970, 0, 1, 16),
			title: 'Karikaturist'
		},
		{
			time: new Date(1970, 0, 1, 17, 30),
			title: 'Buffet'
		},
		{
			time: new Date(1970, 0, 1, 19),
			title: 'Hochzeitstorte'
		},
		{
			time: new Date(1970, 0, 1, 20),
			title: 'Konzert'
		},
		{
			time: new Date(1970, 0, 1, 20, 30),
			title: 'Eröffnungstanz'
		},
		{
			time: new Date(1970, 0, 1, 21),
			title: 'Aftershowparty'
		},
		{
			time: new Date(1970, 0, 1, 23),
			title: 'Mitternachtssnack'
		},
		{
			time: new Date(1970, 0, 1, 0),
			title: 'Ende'
		}
	];

	// Bride and Groom
	const milestones = [
		{
			date: new Date(2016, 2, 29),
			title: 'Begegnung',
			image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 flex-grow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
</svg>`
		},
		{
			date: new Date(2017, 6, 16),
			title: 'Erstes Date',
			image: `<svg class="h-10 w-10 flex-grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M279.1 279.6l222.1-222C523.3 36.38 508.3 0 478.3 0H33.72c-30 0-45 36.38-23.75 57.63L128 175.7V176h.3359l103.6 103.6V463L220.8 464H152C138.8 464 128 474.8 128 488S138.8 512 152 512h208c13.25 0 24-10.75 24-24s-10.75-24-24-24h-78.09c-1.701-.2207-3.203-1-4.965-1h3.02V279.6zM443.7 48l-80 80h-215.5l-80-80H443.7zM255.1 235.8L196.2 176h119.5L255.1 235.8z"></path></svg>`
		},
		{
			date: new Date(2017, 7, 15),
			title: 'Verliebt',
			image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 flex-grow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>`
		},
		{
			date: new Date(2017, 11, 17),
			title: 'Paar',
			image: `<svg class="h-10 w-10 flex-grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M159.1 96c26.5 0 47.1-21.5 47.1-48S186.5 0 160 0C133.5 0 111.1 21.5 111.1 48S133.5 96 159.1 96zM479.1 96c26.5 0 48-21.5 48-48S506.5 0 479.1 0c-26.5 0-47.1 21.5-47.1 48S453.5 96 479.1 96zM242.4 172.6C231.3 145.5 205.2 128 175.8 128H144.2C114.8 128 88.71 145.5 77.56 172.6L33.81 278.9C28.75 291.1 34.59 305.1 46.87 310.2c2.975 1.242 6.066 1.832 9.113 1.832c9.4 0 18.38-5.604 22.2-14.88l17.81-43.27V488c0 13.25 10.75 24 24 24s23.1-10.75 23.1-24V352h32v136c0 13.25 10.75 24 24 24c13.25 0 23.99-10.75 23.99-24V253.9l17.81 43.27C245.6 306.4 254.6 312 263.1 312c3.062 0 6.156-.5781 9.123-1.812c12.28-5.047 18.12-19.06 13.06-31.33L242.4 172.6zM143.1 304v-128h31.1l.002 128H143.1zM606.2 278.9l-43.75-106.3C551.3 145.5 525.2 128 495.8 128h-31.69c-29.31 0-55.44 17.5-66.59 44.58l-43.75 106.3c-5.062 12.27 .7813 26.28 13.06 31.33c2.877 1.205 5.846 1.771 8.764 1.771c7.957 0 15.57-4.205 20.09-11.14L367.1 384h47.1v104c0 13.25 10.75 24 24 24s23.1-10.75 23.1-24V384h31.1v104c0 13.25 10.75 24 24 24c13.25 0 23.99-10.75 23.99-24V384h48.01l-27.43-82.26C569.1 308.1 576.3 312 583.1 312c3.062 0 6.156-.5781 9.125-1.812C605.4 305.1 611.2 291.1 606.2 278.9zM434.6 336l45.4-136.2L525.4 336H434.6z"></path></svg>`
		},
		{
			date: new Date(2021, 7, 22),
			title: 'Verlobung',
			image: `<svg class="h-10 w-10 flex-grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 64C109.1 64 0 125.9 0 208v98.13C0 384.5 114.6 448 256 448s256-63.5 256-141.9V208C512 125.9 401.1 64 256 64zM256 112c110.5 0 200 35.88 200 80c0 9.125-4 17.75-11 25.88C398.2 192.2 331 176 256 176S113.8 192.2 67 217.9C60 209.8 56 201.1 56 192C56 147.9 145.5 112 256 112zM397.8 248.5C361.5 263 311.4 272 256 272S150.5 263 114.2 248.5C149.1 234.2 198.4 224 256 224S361.1 234.2 397.8 248.5zM464 306.1C464 344.4 383 400 256 400s-208-55.63-208-93.88V266.4C94.38 298.8 170.1 320 256 320s161.6-21.25 208-53.63V306.1z"></path></svg>`
		},
		{
			date: new Date(2023, 8, 15),
			title: 'Heirat',
			image: `<svg class="h-10 w-10 flex-grow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M371.9 147.7c10.13 18.5 17.75 38.37 22.38 59c41.13 21.25 69.63 63.75 69.63 113.2c0 70.75-57.25 128-128 128s-128-57.25-128-128c0-54.63 34.5-101.1 82.88-119.5c8.5 17.25 13 36.25 13.13 55.5c0 37.37-16.38 70.75-42 94.12c6.25 15.25 17.13 28.12 31 37c44.75-39.75 66.13-99.63 56.75-158.7c-9.375-59.25-48.25-109.5-103.1-133.5l41.38-66.25L232.4-16H119.4l-55.5 44.62l41.25 66.25C29.03 128.4-13.35 210.6 3.777 292.1s88.88 139.8 172.1 139.9c7.625-.125 15.25-.625 22.88-1.875c48.5 60.5 131 82.13 203 53.12c71.88-28.87 116.4-101.6 109.5-178.9S447.8 163.5 371.9 147.7zM127.9 39.37l8.5-7.375h79l8.5 7.375l-25.5 42.25c-14.88-2.125-30.13-2.125-45 0L127.9 39.37zM47.9 255.1c.125-70.62 57.38-127.9 128-128c33 0 62.88 12.88 85.63 33.5c-59.88 28-101.6 88-101.6 158.5c0 21.75 4.125 43.38 12 63.63C103.3 381.5 47.9 325.2 47.9 255.1z"></path></svg>`
		}
	];
	const monthNames = [
		'Januar',
		'Februar',
		'März',
		'April',
		'Mai',
		'Juni',
		'Juli',
		'August',
		'September',
		'Oktober',
		'November',
		'Dezember'
	];

	// Marriage
	const marriageItems = [
		{
			title: 'Einzug der Braut',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M464.5 246.6L352 179.3v-51.25h48c8.875 0 16-7.125 16-16v-32c0-8.875-7.125-16-16-16H352V16.01c0-8.875-7.125-16-16-16h-32c-8.875 0-16 7.125-16 16v48H240c-8.875 0-16 7.125-16 16v32c0 8.875 7.125 16 16 16H288v51.25L175.5 246.6C165.9 252.5 160 262.9 160 274.1v237.9l96 .0049v-96c0-35.38 28.62-64 64-64s64 28.63 64 64v96l96-.0049V274.1C480 262.9 474.1 252.5 464.5 246.6zM0 396V480c0 17.67 14.33 32 32 32h96v-192l-108.6 46.5C7.625 371.6 0 383.1 0 396zM620.6 366.5L512 320v192h96c17.67 0 32-14.33 32-32v-84C640 383.1 632.4 371.6 620.6 366.5z"></path></svg>`
		},
		{
			title: 'Begrüßung',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 32C330.5 32 352 53.53 352 80C352 88.84 359.2 96 368 96S384 88.84 384 80C384 35.89 348.1 0 304 0C295.2 0 288 7.156 288 16S295.2 32 304 32zM80 416C53.53 416 32 394.5 32 368C32 359.2 24.84 352 16 352S0 359.2 0 368C0 412.1 35.88 448 80 448C88.84 448 96 440.8 96 432S88.84 416 80 416zM472 96c-22.1 0-39.1 17.9-39.1 39.1V216.9L234.4 19.3C228.2 13.05 219.1 9.927 211.8 9.927c-18.3 0-31.1 14.96-31.1 31.1c0 8.19 3.124 16.38 9.372 22.63l124.5 124.5c3.123 3.124 4.685 7.219 4.685 11.31c0 9.156-7.482 15.1-15.1 15.1c-4.095 0-8.19-1.562-11.31-4.686L143.9 64.55C137.7 58.3 129.5 55.18 121.3 55.18c-17.09 0-31.1 13.76-31.1 32c0 8.19 3.124 16.38 9.372 22.63L245.7 256.9c3.124 3.124 4.686 7.219 4.686 11.31c0 9.152-7.48 15.1-15.1 15.1c-4.095 0-8.189-1.562-11.31-4.686L98.65 155.1C92.4 148.8 84.21 145.7 76.02 145.7c-18.31 0-32 14.97-32 31.1c0 8.19 3.124 16.38 9.372 22.63l124.5 124.5c3.124 3.124 4.686 7.219 4.686 11.31c0 8.545-6.877 15.1-15.1 15.1c-4.095 0-8.189-1.562-11.31-4.685L76.03 268.2C69.78 261.1 61.59 258.8 53.4 258.8c-17.09 0-32 13.76-32 32c0 8.19 3.124 16.38 9.372 22.63l147.1 147.1c34.31 34.31 79.38 51.47 124.5 51.47s90.14-17.16 124.5-51.47l26.67-26.67C491.2 396.1 512 345.9 512 292.5V135.1C512 113.9 494.1 96 472 96z"></path></svg>`
		},
		{
			title: 'Lied (Ins Wasser fällt ein Stein)',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M339.1 6.324C347.2 12.32 352 21.84 352 31.96V95.96c0 14.25-9.375 26.75-23 30.75L256 148.1v283.9C256 476.1 205.9 512 144 512S32 476.1 32 431.1s50.13-80.01 112-80.01c16.38 0 32.5 2.75 48 8V60.33c0-14 9.125-26.38 22.38-30.5L311 1.323C320.6-1.553 331.1 .3233 339.1 6.324z"></path></svg>`
		},
		{
			title: 'Gebet',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M272 191.9c-17.62 0-32 14.35-32 31.97V303.9c0 8.875-7.125 16-16 16s-16-7.125-16-16V227.4c0-17.37 4.75-34.5 13.75-49.37L299.5 48.41c9-15.12 4.125-34.76-11-43.88C273.1-4.225 255.8 .1289 246.1 13.63C245.1 13.88 245.5 13.88 245.4 14.13L128.1 190C117.5 205.9 112 224.3 112 243.3v80.24l-90.13 29.1C8.75 357.9 0 370.1 0 383.9v95.99c0 10.88 8.5 31.1 32 31.1c2.75 0 5.375-.25 8-1l179.3-46.62C269.1 450 304 403.8 304 351.9V223.9C304 206.3 289.6 191.9 272 191.9zM618.1 353.6L528 323.6V243.4c0-19-5.5-37.37-16.12-53.25l-117.3-175.9c-.125-.25-.6251-.2487-.75-.4987c-9.625-13.5-27.88-17.85-42.38-9.229c-15.12 9.125-20 28.76-11 44.01l77.75 129.5C427.3 193 432 210 432 227.5v76.49c0 8.875-7.125 16-16 16s-16-7.125-16-16V223.1c0-17.62-14.38-31.97-32-31.97s-32 14.38-32 31.1v127.1c0 51.87 34.88 98.12 84.75 112.4L600 511C602.6 511.6 605.4 512 608 512c23.5 0 32-21.25 32-31.1v-95.99C640 370.3 631.3 358 618.1 353.6z"></path></svg>`
		},
		{
			title: 'Biblische Lesung',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M544 32.01c0-19.62-17.5-34.63-36.89-31.62L336 26.86v384l208-46.23V32.01zM304 26.86L132.9 .3828C113.5-2.617 96 12.38 96 32.01v332.6l208 46.23V26.86zM600.2 32.97L576 39.03v325.6c0 14.1-10.42 27.98-25.06 31.24L320 447.2L89.06 395.9C74.42 392.6 64 379.7 64 364.7V39.03L39.76 32.97C19.56 27.92 0 43.19 0 64.01v351.1c0 15 10.42 27.98 25.06 31.24l288 63.1c4.572 1.016 9.311 1.016 13.88 0l288-63.1C629.6 443.1 640 431 640 416V64.01C640 43.19 620.4 27.92 600.2 32.97z"></path></svg>`
		},
		{
			title: 'Lied (Liebe ist nicht nur ein Wort)',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M339.1 6.324C347.2 12.32 352 21.84 352 31.96V95.96c0 14.25-9.375 26.75-23 30.75L256 148.1v283.9C256 476.1 205.9 512 144 512S32 476.1 32 431.1s50.13-80.01 112-80.01c16.38 0 32.5 2.75 48 8V60.33c0-14 9.125-26.38 22.38-30.5L311 1.323C320.6-1.553 331.1 .3233 339.1 6.324z"></path></svg>`
		},
		{
			title: 'Predigt',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z"></path></svg>`
		},
		{
			title: 'Trauvers',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M320 168C320 128.2 287.8 96 248 96C245.3 96.12 242.6 96.38 240 96.81V96c.0234-17.66 14.34-31.98 32-32c17.67 0 32-14.33 32-32c0-17.67-14.33-32-32-32c-52.1 .0566-95.94 43-96 96v72c0 39.76 32.24 72 72 72S320 207.8 320 168zM72 96C69.32 96.12 66.65 96.38 64 96.81V96c.0234-17.66 14.34-31.98 32-32c17.67 0 32-14.33 32-32c0-17.67-14.33-32-32-32C43 .0566 .0586 43 0 96v72C0 207.8 32.24 240 72 240S144 207.8 144 168C144 128.2 111.8 96 72 96zM328 272C288.2 272 256 304.2 256 344C256 383.8 288.2 416 328 416c2.68-.1172 5.352-.3867 8-.8066V416c-.0234 17.66-14.34 31.98-32 32c-17.67 0-32 14.33-32 32c0 17.67 14.33 32 32 32c52.1-.0586 95.94-43.01 96-96v-72C400 304.2 367.8 272 328 272zM504 272c-39.76 0-72 32.23-72 72c0 39.76 32.24 72 72 72c2.68-.1172 5.352-.3867 8-.8066V416c-.0234 17.66-14.34 31.98-32 32c-17.67 0-32 14.33-32 32c0 17.67 14.33 32 32 32c52.1-.0586 95.94-43.01 96-96v-72C576 304.2 543.8 272 504 272z"></path></svg>`
		},
		{
			title: 'Lied (Da berühren sich Himmel und Erde)',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M339.1 6.324C347.2 12.32 352 21.84 352 31.96V95.96c0 14.25-9.375 26.75-23 30.75L256 148.1v283.9C256 476.1 205.9 512 144 512S32 476.1 32 431.1s50.13-80.01 112-80.01c16.38 0 32.5 2.75 48 8V60.33c0-14 9.125-26.38 22.38-30.5L311 1.323C320.6-1.553 331.1 .3233 339.1 6.324z"></path></svg>`
		},
		{
			title: 'Trauung',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M351.2 160.7c14 22.12 23.75 46.62 28.63 72.24c51.63 21.1 79 78.74 64.13 132.7c-14.88 54.12-67.5 88.74-123 81.24C265.4 439.5 224 392.1 224 335.1c0-42.25 23.75-78.62 58.25-97.49C285.6 249.1 288 260.2 288 271.1c0 28.5-11 55.1-30.75 76.62c3.625 22.5 16.62 42.51 35.75 54.76C330.5 370.1 352 322.1 352 271.1c0-81.62-55.59-150.2-130.1-170.1l34.96-69.92L223.1 0h-95.1l-32 31.1l34.96 69.92C55.59 121.8 0 190.4 0 271.1c0 97.24 78.75 175.1 176 175.1c7.625 0 15.29-.7385 22.91-1.863c46.75 58.25 125.2 80.73 195.6 55.86C465 477.2 512 410.6 512 335.1C512 243.1 441.2 168.5 351.2 160.7zM64 271.1c.125-61.87 50.13-111.9 112-111.1c26.88 0 51.25 9.874 70.5 25.75C195 216.2 160 271.6 160 335.1c0 15.87 2.25 31.73 6.5 46.98C109.2 378.1 64 330.5 64 271.1z"></path></svg>`
		},
		{
			title: 'Sandzeremonie',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M375.3 10.12C369.2 3.625 360.8 0 351.9 0H32.07C23.2 0 14.8 3.625 8.674 10.12c-5.998 6.375-9.121 15-8.621 23.88L32.04 482C33.17 498.9 47.16 512 64.04 512h255.9c16.87 0 30.87-13.12 31.99-30l31.99-448C384.4 25.12 381.3 16.5 375.3 10.12zM66.35 64h251.3l-13.71 192H80.06L66.35 64z"></path></svg>`
		},
		{
			title: 'Trauungslied',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M511.1 367.1c0 44.18-42.98 80-95.1 80s-95.1-35.82-95.1-79.1c0-44.18 42.98-79.1 95.1-79.1c11.28 0 21.95 1.92 32.01 4.898V148.1L192 224l-.0023 208.1C191.1 476.2 149 512 95.1 512S0 476.2 0 432c0-44.18 42.98-79.1 95.1-79.1c11.28 0 21.95 1.92 32 4.898V126.5c0-12.97 10.06-26.63 22.41-30.52l319.1-94.49C472.1 .6615 477.3 0 480 0c17.66 0 31.97 14.34 32 31.99L511.1 367.1z"></path></svg>`
		},
		{
			title: 'Fürbitten',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M416 176C416 78.8 322.9 0 208 0S0 78.8 0 176c0 39.57 15.62 75.96 41.67 105.4c-16.39 32.76-39.23 57.32-39.59 57.68c-2.1 2.205-2.67 5.475-1.441 8.354C1.9 350.3 4.602 352 7.66 352c38.35 0 70.76-11.12 95.74-24.04C134.2 343.1 169.8 352 208 352C322.9 352 416 273.2 416 176zM599.6 443.7C624.8 413.9 640 376.6 640 336C640 238.8 554 160 448 160c-.3145 0-.6191 .041-.9336 .043C447.5 165.3 448 170.6 448 176c0 98.62-79.68 181.2-186.1 202.5C282.7 455.1 357.1 512 448 512c33.69 0 65.32-8.008 92.85-21.98C565.2 502 596.1 512 632.3 512c3.059 0 5.76-1.725 7.02-4.605c1.229-2.879 .6582-6.148-1.441-8.354C637.6 498.7 615.9 475.3 599.6 443.7z"></path></svg>`
		},
		{
			title: 'Lied (Der Herr segne dich)',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M339.1 6.324C347.2 12.32 352 21.84 352 31.96V95.96c0 14.25-9.375 26.75-23 30.75L256 148.1v283.9C256 476.1 205.9 512 144 512S32 476.1 32 431.1s50.13-80.01 112-80.01c16.38 0 32.5 2.75 48 8V60.33c0-14 9.125-26.38 22.38-30.5L311 1.323C320.6-1.553 331.1 .3233 339.1 6.324z"></path></svg>`
		},
		{
			title: 'Segen',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M383.1 160v64c0 17.62-14.37 32-31.1 32h-96v224c0 17.62-14.38 32-31.1 32H160c-17.62 0-32-14.38-32-32V256h-96C14.37 256-.0008 241.6-.0008 224V160c0-17.62 14.38-32 32-32h96V32c0-17.62 14.38-32 32-32h64c17.62 0 31.1 14.38 31.1 32v96h96C369.6 128 383.1 142.4 383.1 160z"></path></svg>`
		},
		{
			title: 'Auszug des Brautpaares',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M464.5 246.6L352 179.3v-51.25h48c8.875 0 16-7.125 16-16v-32c0-8.875-7.125-16-16-16H352V16.01c0-8.875-7.125-16-16-16h-32c-8.875 0-16 7.125-16 16v48H240c-8.875 0-16 7.125-16 16v32c0 8.875 7.125 16 16 16H288v51.25L175.5 246.6C165.9 252.5 160 262.9 160 274.1v237.9l96 .0049v-96c0-35.38 28.62-64 64-64s64 28.63 64 64v96l96-.0049V274.1C480 262.9 474.1 252.5 464.5 246.6zM0 396V480c0 17.67 14.33 32 32 32h96v-192l-108.6 46.5C7.625 371.6 0 383.1 0 396zM620.6 366.5L512 320v192h96c17.67 0 32-14.33 32-32v-84C640 383.1 632.4 371.6 620.6 366.5z"></path></svg>`
		},
		{
			title: 'Sektempfang',
			image: `<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M639.4 433.6c-8.374-20.37-31.75-30.12-52.12-21.62l-22.12 9.249l-38.75-101.1c47.87-34.1 64.87-100.2 34.5-152.7l-86.62-150.5c-7.999-13.87-24.1-19.75-39.1-13.62l-114.2 47.37L205.8 2.415C190.8-3.71 173.8 2.165 165.8 16.04L79.15 166.5C48.9 219 65.78 284.3 113.6 319.2l-38.75 101.9L52.78 411.9c-20.37-8.499-43.62 1.25-52.12 21.62c-1.75 4.124 .125 8.749 4.25 10.5l162.4 67.37c3.1 1.75 8.624-.125 10.37-4.249c8.374-20.37-1.25-43.87-21.62-52.37l-22.12-9.124l39.37-103.6c4.5 .4999 8.874 1.25 13.12 1.25c51.75 0 99.37-32.1 113.4-85.24l20.25-75.36l20.25 75.36c13.1 52.24 61.62 85.24 113.4 85.24c4.25 0 8.624-.7499 13.12-1.25l39.25 103.6l-22.12 9.124c-20.37 8.499-30.12 31.1-21.62 52.37c1.75 4.124 6.5 5.999 10.5 4.249l162.4-67.37C639.1 442.2 641.1 437.7 639.4 433.6zM275.9 162.1L163.8 115.6l36.5-63.37L294.8 91.4L275.9 162.1zM364.1 162.1l-18.87-70.74l94.49-39.12l36.5 63.37L364.1 162.1z"></path></svg>`
		}
	];
</script>

<div class="shadow-2xl h-[56rem] w-[42rem] p-1 bg-white">
	<div class="border-2 border-gray-900 border-dashed h-full flex flex-col p-4">
		<div class="flex-grow flex flex-col justify-center items-center gap-8 px-12">
			<div class="grid grid-rows-1 grid-cols-2 w-[21rem] h-[21rem]">
				<div
					class="col-start-1 row-start-1 image bg-cover bg-center bg-no-repeat filter grayscale"
				/>
				<div class="col-start-2 row-start-1 flex flex-col">
					<div
						class="flex-1 flex justify-center items-end text-center text-4xl uppercase font-cheap-pine-sans tracking-widest"
					>
						B l a c k
					</div>
					<div
						class="flex-1 bg-black text-white text-center text-4xl uppercase font-cheap-pine-sans tracking-widest"
					>
						W h i t e
					</div>
				</div>
			</div>
			<div class="self-stretch flex gap-4 px-4 mx-12 items-center">
				<div class="flex-grow border-t-2 border-black" />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-10 w-10"
					viewBox="0 0 20 20"
					fill="rgb(220,38,38)"
				>
					<path
						fill-rule="evenodd"
						d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
						clip-rule="evenodd"
					/>
				</svg>
				<div class="flex-grow border-t-2 border-black" />
			</div>
			<div
				class="text-center uppercase font-cheap-pine-sans tracking-wider leading-4 pb-1 text-2xl"
			>
				Gesucht und Gefunden, in Liebe verbunden
			</div>
		</div>
		<hr class="border border-black my-1" />
		<hr class="border-[3px] border-black my-1" />
		<div class="flex items-center divide-x-2 divide-black my-3">
			<span class="text-8xl font-cheap-pine pr-2">23</span>
			<div class="flex flex-col text-center px-2">
				<span
					class="font-cheap-pine-sans text-4xl tracking-widest leading-none bg-black text-white px-1"
					>September</span
				>
				<span class="font-cheap-pine-sans text-6xl tracking-wider font-bold leading-[0.85]"
					>2 0 2 3</span
				>
			</div>
			<div class="flex-grow flex flex-col text-center">
				<span class="font-cheap-pine-sans text-4xl tracking-widest leading-none">
					Midrène's und Josua's
				</span>
				<div class="flex items-center justify-between px-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="text-red-600 h-9 w-9"
						viewBox="0 0 20 20"
						fill="currentcolor"
					>
						<path d="M20 7h-7L10 .5 7 7H0l5.46 5.47-1.64 7 6.18-3.7 6.18 3.73-1.63-7z" />
					</svg>
					<span class="font-cheap-pine text-6xl tracking-widest"> Hochzeit </span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="text-red-600 h-9 w-9"
						viewBox="0 0 20 20"
						fill="currentcolor"
					>
						<path d="M20 7h-7L10 .5 7 7H0l5.46 5.47-1.64 7 6.18-3.7 6.18 3.73-1.63-7z" />
					</svg>
				</div>
			</div>
		</div>
		<span class="text-center text-gray-700 tracking-widest">
			x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
			x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
			x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x
		</span>
	</div>
</div>

<div class="shadow-2xl h-[56rem] w-[42rem] p-1 bg-white">
	<div class="border-2 border-gray-900 border-dashed h-full flex flex-col p-4">
		<div class="relative">
			<svg
				class="w-full"
				version="1.1"
				viewBox="0 0 264.58 39.688"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path fill="#000" d="m46.302 34.297-5.5562-5.5562h5.5562z" stroke-width=".39688" />
				<path
					transform="matrix(.28414 0 0 .28414 9.5684 -16.833)"
					d="m24.523 149.68-6.9838 6.9838-6.9838-6.9838 6.9838-6.9838z"
				/>
				<g stroke-width=".39688">
					<path d="m9.2604 17.099 8.599 8.599" fill="none" stroke="#f00" stroke-linecap="square" />
					<path d="m9.2604 34.297 8.599-8.599" fill="none" stroke="#f00" stroke-linecap="square" />
					<path d="m218.09 34.297 5.5562-5.5562h-5.5562z" />
				</g>
				<path
					transform="matrix(-.28414 0 0 .28414 254.83 -16.833)"
					d="m24.523 149.68-6.9838 6.9838-6.9838-6.9838 6.9838-6.9838z"
				/>
				<path
					d="m255.14 17.099-8.599 8.599"
					fill="none"
					stroke="#f00"
					stroke-linecap="square"
					stroke-width=".39688"
				/>
				<path
					d="m255.14 34.297-8.599-8.599"
					fill="none"
					stroke="#f00"
					stroke-linecap="square"
					stroke-width=".39688"
				/>
				<g stroke="#000">
					<path
						d="m10.583 17.099h35.719v17.198h-35.719l8.599-8.599z"
						fill="none"
						stroke-width=".79375"
					/>
					<path
						d="m253.81 17.099h-35.719v17.198h35.719l-8.599-8.599z"
						fill="none"
						stroke-width=".79375"
					/>
					<rect
						x="33.342"
						y="5.461"
						width="197.9"
						height="23.275"
						fill="#fff"
						fill-rule="evenodd"
						stroke-width=".93392"
					/>
				</g>
			</svg>

			<div
				class="absolute top-[0.65rem] w-full font-cheap-pine text-6xl text-center tracking-widest"
			>
				Programm
			</div>
		</div>
		<hr class="border-[3px] border-black my-1" />
		<hr class="border border-black my-1" />
		<div class="flex-grow flex py-3 relative">
			<div
				class="absolute left-1/2 top-2 bottom-2 transform -translate-x-1/2 bg-black w-[0.125rem]"
			/>
			<div class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-around">
				{#each programItems as programItem, id}
					<div class="h-[0.175rem] w-[47.5%] bg-black {id % 2 === 0 ? '' : 'self-end'}" />
				{/each}
			</div>
			<div
				class="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 flex flex-col justify-around"
			>
				{#each programItems as _}
					<div class="w-3 h-3 rounded-full bg-black" />
				{/each}
			</div>
			<div
				class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-around font-cheap-pine-sans text-3xl tracking-widest"
			>
				{#each programItems as programItem, id}
					<span class="w-[47.5%] {id % 2 === 0 ? 'self-end' : 'text-right'}">
						{programItem.time.getHours()}{programItem.time.getMinutes() === 0
							? ''
							: ':' + programItem.time.getMinutes()} Uhr
					</span>
				{/each}
			</div>
			<div class="flex flex-col justify-between w-full text-white text-2xl font-bold uppercase">
				{#each programItems as programItem, id}
					<div class="relative mb-2 mr-2 {id % 2 === 0 ? 'self-start' : 'self-end'}">
						<div
							class="absolute top-[6px] left-[6px] w-full h-full bg-white border-4 border-red-600 ring-8 ring-white"
						/>
						<div class="relative bg-black border-2 border-white px-1">{programItem.title}</div>
					</div>
				{/each}
			</div>
		</div>
		<hr class="border border-black my-1" />
		<hr class="border-[3px] border-black my-1" />
		<div class="flex justify-between font-bold uppercase">
			<span class="flex-1 text-left">Midrène's und Josua's Hochzeit</span>
			<span class="flex-1 text-right">Seite {++pageCounter} / {pageCounter}</span>
		</div>
		<span class="text-center text-gray-700 tracking-widest">
			x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
			x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
			x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x
		</span>
	</div>
</div>

<div class="shadow-2xl h-[56rem] w-[42rem] p-1 bg-white">
	<div class="border-2 border-gray-900 border-dashed h-full flex flex-col p-4">
		<div class="relative">
			<svg
				class="w-full"
				version="1.1"
				viewBox="0 0 264.58 39.688"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path fill="#000" d="m46.302 34.297-5.5562-5.5562h5.5562z" stroke-width=".39688" />
				<path
					transform="matrix(.28414 0 0 .28414 9.5684 -16.833)"
					d="m24.523 149.68-6.9838 6.9838-6.9838-6.9838 6.9838-6.9838z"
				/>
				<g stroke-width=".39688">
					<path d="m9.2604 17.099 8.599 8.599" fill="none" stroke="#f00" stroke-linecap="square" />
					<path d="m9.2604 34.297 8.599-8.599" fill="none" stroke="#f00" stroke-linecap="square" />
					<path d="m218.09 34.297 5.5562-5.5562h-5.5562z" />
				</g>
				<path
					transform="matrix(-.28414 0 0 .28414 254.83 -16.833)"
					d="m24.523 149.68-6.9838 6.9838-6.9838-6.9838 6.9838-6.9838z"
				/>
				<path
					d="m255.14 17.099-8.599 8.599"
					fill="none"
					stroke="#f00"
					stroke-linecap="square"
					stroke-width=".39688"
				/>
				<path
					d="m255.14 34.297-8.599-8.599"
					fill="none"
					stroke="#f00"
					stroke-linecap="square"
					stroke-width=".39688"
				/>
				<g stroke="#000">
					<path
						d="m10.583 17.099h35.719v17.198h-35.719l8.599-8.599z"
						fill="none"
						stroke-width=".79375"
					/>
					<path
						d="m253.81 17.099h-35.719v17.198h35.719l-8.599-8.599z"
						fill="none"
						stroke-width=".79375"
					/>
					<rect
						x="33.342"
						y="5.461"
						width="197.9"
						height="23.275"
						fill="#fff"
						fill-rule="evenodd"
						stroke-width=".93392"
					/>
				</g>
			</svg>

			<div
				class="absolute top-[0.65rem] w-full font-cheap-pine text-6xl text-center tracking-widest"
			>
				Das Brautpaar
			</div>
		</div>
		<hr class="border-[3px] border-black my-1" />
		<hr class="border border-black my-1" />
		<div class="flex-grow relative">
			<div class="absolute right-0 left-0 top-1/2 transform -translate-y-1/2">
				<hr class="border border-black" />
			</div>
			<div class="absolute right-0 left-0 top-1/2 transform -translate-y-1/2 flex justify-around">
				{#each milestones as _}
					<div class="w-3 h-3 rounded-full bg-black" />
				{/each}
			</div>
			<div class="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-around">
				{#each milestones as _, id}
					<div class="w-[0.175rem] h-36 bg-black {id % 2 === 0 ? 'mb-44' : 'mt-44'}" />
				{/each}
			</div>
			<div
				class="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-around font-cheap-pine-sans text-3xl"
			>
				{#each milestones as milestone, id}
					<div
						class="flex flex-col text-center {id % 2 === 0
							? 'mt-[25%]'
							: 'mb-[25%]'} min-w-[5.5rem]"
					>
						<span class="text-7xl font-cheap-pine leading-[0.9]">{milestone.date.getDate()}</span>
						<span
							class="font-cheap-pine-sans text-xl tracking-widest leading-none bg-black text-white px-1"
						>
							{monthNames[milestone.date.getMonth()]}
						</span>
						<div class="flex justify-between font-cheap-pine-sans text-4xl font-bold">
							{#each milestone.date.getFullYear().toString().split('') as num}
								<span>{num}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
			<div class="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-around">
				{#each milestones as milestone, id}
					<div class="relative mb-3 mr-3 {id % 2 === 0 ? 'mb-[75%]' : 'mt-[75%]'}">
						<div class="absolute top-2 left-2 w-full h-full bg-white border-4 border-red-600" />
						<div
							class="relative border-4 border-black bg-white min-w-[5.5rem] max-w-[5.5rem] min-h-[6.5rem] flex flex-col items-center ring-2 ring-white"
						>
							{@html milestone.image}
							<span class="self-stretch bg-black text-white text-center">{milestone.title}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<hr class="border border-black my-1" />
		<hr class="border-[3px] border-black my-1" />
		<div class="flex justify-between font-bold uppercase">
			<span class="flex-1 text-left">Midrène's und Josua's Hochzeit</span>
			<span class="flex-1 text-right">Seite {++pageCounter} / {pageCounter}</span>
		</div>
		<span class="text-center text-gray-700 tracking-widest">
			x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
			x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
			x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x
		</span>
	</div>
</div>

<div class="shadow-2xl h-[56rem] w-[42rem] p-1 bg-white">
	<div class="border-2 border-gray-900 border-dashed h-full flex flex-col p-4">
		<div class="flex justify-between">
			{#each marriageItems as marriageItem}
				{@html marriageItem.image}
			{/each}
		</div>
		<div class="flex-grow">Einzug der Braut</div>
		<div class="flex-grow">Gesang: Mareike Riegert</div>
		<div class="flex-grow">Pianist: --</div>
		<div class="flex-grow">Begrüßung</div>
		<div class="flex-grow">Pastorin: Christine Finkbeiner</div>
		<hr class="border border-black my-1" />
		<hr class="border-[3px] border-black my-1" />
		<div class="flex justify-between font-bold uppercase">
			<span class="flex-1 text-left">Midrène's und Josua's Hochzeit</span>
			<span class="flex-1 text-right">Seite {++pageCounter} / {pageCounter}</span>
		</div>
		<span class="text-center text-gray-700 tracking-widest">
			x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
			x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;
			x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;x
		</span>
	</div>
</div>

<style lang="postcss">
	.image {
		background-image: url('/images/people/heads.jpg');
	}
</style>
