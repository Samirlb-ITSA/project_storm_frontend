interface UsersProps {
  value: string;
  title: string;
  imageName: 'company' | 'users' | 'activeJobOffer' | 'jobOffer';
  hasUpdates: boolean;
  updatesPercentage: string;
}

const Card = (props: UsersProps) => {
  const companySvg = <svg version="1.0" className="fill-primary dark:fill-white pb-2" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 115 102"><path d="M34 35.5c0 2-.5 2.5-2.5 2.5H29v51h52V48.1l-9.7-.3-9.8-.3-.3-4.8c-.3-4.2-.5-4.7-2.8-4.7-1.9 0-2.4-.5-2.4-2.5V33H34v2.5zm20 2c0 2 .5 2.5 2.5 2.5H59v47H47v-4c0-3.3-.3-4-2-4s-2 .7-2 4v4H31V40h2.5c2 0 2.5-.5 2.5-2.5 0-2.5.1-2.5 9-2.5s9 0 9 2.5zm25 31V87H61V50h18v18.5z"/><path d="M37 44.1c0 .5.5.7 1 .4.6-.3 1-.8 1-1.1 0-.2-.4-.4-1-.4-.5 0-1 .5-1 1.1zM42 44.1c0 .5.5.7 1 .4.6-.3 1-.8 1-1.1 0-.2-.4-.4-1-.4-.5 0-1 .5-1 1.1zM47 44.1c0 .5.5.7 1 .4.6-.3 1-.8 1-1.1 0-.2-.4-.4-1-.4-.5 0-1 .5-1 1.1zM52 44.1c0 .5.5.7 1 .4.6-.3 1-.8 1-1.1 0-.2-.4-.4-1-.4-.5 0-1 .5-1 1.1zM37 51c0 1.1.5 2 1 2 .6 0 1-.9 1-2s-.4-2-1-2c-.5 0-1 .9-1 2zM42 51c0 1.1.5 2 1 2 .6 0 1-.9 1-2s-.4-2-1-2c-.5 0-1 .9-1 2zM47 51c0 1.1.5 2 1 2 .6 0 1-.9 1-2s-.4-2-1-2c-.5 0-1 .9-1 2zM52 51c0 1.1.5 2 1 2 .6 0 1-.9 1-2s-.4-2-1-2c-.5 0-1 .9-1 2zM37 58.5c0 1.4.5 2.5 1 2.5.6 0 1-1.1 1-2.5s-.4-2.5-1-2.5c-.5 0-1 1.1-1 2.5zM42 58.5c0 1.5.4 2.4 1 2 .6-.3 1-1.2 1-2s-.4-1.7-1-2c-.6-.4-1 .5-1 2zM47 58.5c0 1.5.4 2.4 1 2 .6-.3 1-1.2 1-2s-.4-1.7-1-2c-.6-.4-1 .5-1 2zM52 58.5c0 1.5.4 2.4 1 2 .6-.3 1-1.2 1-2s-.4-1.7-1-2c-.6-.4-1 .5-1 2zM37 66c0 1.1.5 2 1 2 .6 0 1-.9 1-2s-.4-2-1-2c-.5 0-1 .9-1 2zM42 66c0 1.1.5 2 1 2 .6 0 1-.9 1-2s-.4-2-1-2c-.5 0-1 .9-1 2zM47 66c0 1.1.5 2 1 2 .6 0 1-.9 1-2s-.4-2-1-2c-.5 0-1 .9-1 2zM52 66c0 1.1.5 2 1 2 .6 0 1-.9 1-2s-.4-2-1-2c-.5 0-1 .9-1 2zM37 73.6c0 1.4.4 2.3 1 1.9.6-.3 1-1.5 1-2.6 0-1-.4-1.9-1-1.9-.5 0-1 1.2-1 2.6zM42 73.6c0 1.4.4 2.3 1 1.9.6-.3 1-1.5 1-2.6 0-1-.4-1.9-1-1.9-.5 0-1 1.2-1 2.6zM47 73.6c0 1.4.4 2.3 1 1.9.6-.3 1-1.5 1-2.6 0-1-.4-1.9-1-1.9-.5 0-1 1.2-1 2.6zM52 73.5c0 1.5.4 2.4 1 2 .6-.3 1-1.2 1-2s-.4-1.7-1-2c-.6-.4-1 .5-1 2zM37 81.5c0 1.4.5 2.5 1 2.5.6 0 1-1.1 1-2.5s-.4-2.5-1-2.5c-.5 0-1 1.1-1 2.5zM52 81.5c0 1.4.5 2.5 1 2.5.6 0 1-1.1 1-2.5s-.4-2.5-1-2.5c-.5 0-1 1.1-1 2.5zM64 54c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM69 54c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM74 54c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM64 59c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM69 59c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM74 59.1c0 .5.5.7 1 .4.6-.3 1-.8 1-1.1 0-.2-.4-.4-1-.4-.5 0-1 .5-1 1.1zM64 63c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM69 63c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM74 63c0 .5.5 1 1.1 1 .5 0 .7-.5.4-1-.3-.6-.8-1-1.1-1-.2 0-.4.4-.4 1zM64 68c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM69 68c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM74 68c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM64 73c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM69 73c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM74 73c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM64 78c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM69 78c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM74 78c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM64 83c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM69 83c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM74 83c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1z"/></svg>
  const usersSvg = <svg width="22" height="18" className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg"><path d="M7.184 8.038c2.131 0 3.885-1.685 3.885-3.782S9.315.475 7.184.475 3.3 2.159 3.3 4.256c0 2.097 1.753 3.782 3.884 3.782zm0-5.982c1.272 0 2.338.997 2.338 2.235 0 1.237-1.032 2.234-2.338 2.234s-2.337-.997-2.337-2.234c0-1.238 1.065-2.235 2.337-2.235zM15.812 9.688c1.857 0 3.335-1.444 3.335-3.266s-1.513-3.266-3.335-3.266c-1.821 0-3.334 1.444-3.334 3.266s1.513 3.266 3.334 3.266zm0-4.95c.997 0 1.788.756 1.788 1.718 0 .963-.79 1.719-1.788 1.719-.996 0-1.787-.756-1.787-1.719 0-.962.79-1.719 1.787-1.719z"/><path d="M15.984 10.031h-.31c-1.03 0-2.027.31-2.887.825-.928-1.237-2.406-2.062-4.056-2.062h-3.06C2.854 8.828.62 11.062.62 13.847v2.475a1.16 1.16 0 001.168 1.169h18.46c.653 0 1.203-.55 1.203-1.203v-.825c-.034-2.991-2.475-5.432-5.466-5.432zM2.166 15.944v-2.097a3.521 3.521 0 013.506-3.506h3.06a3.521 3.521 0 013.505 3.506v2.097H2.166zm17.703 0h-6.12v-2.097c0-.55-.102-1.1-.274-1.616.619-.447 1.375-.653 2.165-.653h.31a3.903 3.903 0 013.884 3.885v.48h.035z"/></svg>
  const activeJobOfferSvg = <svg version="1.0" className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 670 602"><path d="M334.9 79c-30.1 6.3-54.9 29.2-63.9 58.8l-2.2 7.2h-44.9c-47.4 0-49.6.2-51.3 4.5-.8 2.2-.8 132.8 0 135 .7 1.8 5.5 4.5 7.9 4.5.9 0 3-1.3 4.6-2.9l2.9-2.9V161h78.8l.7 7.7c3.6 39.3 32.2 71.1 70 77.7l7 1.2.3 21.4c.2 20.4.3 21.5 2.4 23.7 2.7 2.9 7.7 3 10.9.4 2.4-1.9 2.4-2.2 2.7-23.8l.3-21.9 7.4-1.1c36.6-5.9 66.2-38.6 69.3-76.8l.7-8 38.7-.3 38.8-.2.2 61.5.3 61.4 2.2 2.3c3.1 3.1 8.9 3 11.4-.1 1.8-2.2 1.9-5.3 1.9-68.6 0-36.5-.3-67.1-.6-68-1.7-4.3-4-4.5-50.7-4.5h-44.4l-1.2-5.4c-.7-3-3.2-9.5-5.5-14.3-17.4-35.6-56-54.5-94.7-46.3zm31.9 15.5c23.7 4.7 43.8 22.7 51.9 46.4 5.4 15.7 4.1 35.7-3.2 50.9-3.2 6.7-9.3 16.1-10.5 16.2-.4 0-1.2-1.7-1.9-3.8-3.9-10.8-15.3-23.2-26.4-28.6-27-13.1-59.7-1.8-72.4 24.9l-3.6 7.8-2.9-3.4c-3.8-4.6-10.5-18.2-12.2-25-6-23.7.6-48.4 17.7-65.8 16.8-17.2 39.7-24.3 63.5-19.6z"/><path d="M341.5 112.3c-5.7 2.7-11.7 8.9-14.1 14.4-.9 2.2-1.6 6.5-1.6 10.3 0 7.7 1.8 12.5 7 18.2 8 8.9 21.4 11.5 32 6.2 19.5-9.7 20.4-37 1.5-48.1-6.7-3.9-17.8-4.4-24.8-1zM161.1 324.1c-21.1 5.5-38.5 19.8-48.1 39.4-5.4 11.1-7.4 19.7-7.4 33 .1 58.7 65.6 94.1 114.7 61.8l8.1-5.3 11.2 11.1c11.2 11.1 11.2 11.1 9.6 13.8-1.3 2.3-1.3 3-.1 5.1.8 1.4 11 11.9 22.7 23.3 17.1 16.6 21.9 20.7 24 20.7 2.1 0 4.9-2.2 12.1-9.4 7.9-7.9 9.4-10 9.4-12.6 0-2.7-2.5-5.6-21.2-23.8-11.7-11.4-22.4-21.1-23.7-21.7-1.7-.6-3.5-.5-5.7.3l-3.2 1.2-11.1-11.1-11.1-11 4.7-9.2c10.9-21.8 10.8-45.6-.2-67.7-3.4-6.9-6.1-10.3-13.8-18.1-8.3-8.4-10.8-10.2-19-14.2-5.2-2.5-12.7-5.2-16.7-6.1-10-2.2-25.8-2-35.2.5zm32.4 20.4c14.2 3.7 27.3 14.5 33.7 27.6 10.6 21.6 6.7 45.2-10.2 61.9-10.6 10.6-22.2 15.3-37.5 15.2-15.7 0-28.5-5.8-39.3-17.7-9.2-10.1-13.6-21.4-13.6-35.5 0-24.2 16.1-45.1 39.7-51.5 7-1.8 19.9-1.9 27.2 0zM342.7 323.4c-12.6 4.5-20.2 15.5-20.2 29.1.1 17 13 29.9 30 29.9 8.6 0 13.1-1.4 19.4-6.4 7-5.5 11.1-14.1 11.1-23 0-9.7-2.3-15.5-8.9-22.1-3.8-3.8-7.2-6.1-10.5-7.2-5.9-2-15.6-2.1-20.9-.3zM514.2 323.6c-6.1 2.3-14.5 10.3-17.1 16.5-2.6 5.9-3 15.1-1.1 21.5 1.7 5.7 7.3 13 12.7 16.4 15.7 10 36.8 3.4 44.6-13.9 3.1-6.8 2.9-16.9-.5-24.2-3-6.5-8.1-12-14.1-15.1-5.5-2.8-18.3-3.5-24.5-1.2zM336.5 392.9c-9.8 2.8-18.4 8-26.1 15.6-8.3 8.2-12.4 15.1-15.6 25.8-2.2 7.8-2.2 7.9-.3 9.3 1.6 1.2 11.5 1.4 58.6 1.4 63.1 0 59.6.4 58.6-6.8-1.5-10.8-10.8-26.1-20.5-33.7-6.9-5.5-15.7-9.9-23.7-12-7.9-2-23.3-1.8-31 .4zM507.4 393.4c-21.5 7-36.4 23.3-41.8 45.8-1.4 6-3.1 5.8 59.4 5.8s60.7.2 59.4-5.8c-4.9-22.5-22.5-41.1-44-46.6-9.4-2.4-24.2-2.1-33 .8z"/></svg>
  const jobOfferSvg = <svg version="1.0" className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 628 636"><path d="M69.9 79.3c-1.8 1.2-3.9 3.4-4.6 4.7-1 1.9-1.3 18.6-1.3 73 0 69 .1 70.6 2 73.8 2.7 4.4 7.4 6.2 16 6.2h7l.2 143.2c.3 138.9.4 143.4 2.2 146.1 3.2 4.7 6.4 5.7 18.6 5.7h11v11c0 11.9 1 15.5 5.2 18.4 2 1.4 15.6 1.6 127.6 1.6h125.3l6.3 5.4c33.2 28.1 78.9 27.3 110.7-2.2 11-10.1 22.2-30.1 23.6-42.1.5-4.1.2-5.2-1.6-7-2.6-2.6-8.2-2.8-10.4-.3-.9.9-2.7 5.3-4.1 9.7-4.3 13.5-12.3 25.1-23 33.2-20.9 15.8-46.9 18.5-70.1 7.3-18-8.7-31.5-25.4-36-44.3-1.9-8.1-1.9-23.5.1-31.7 4.5-19.2 18.1-35.7 36.9-44.6 35.1-16.8 77.8 1.2 91.2 38.4 2.7 7.6 4.3 9.2 8.9 9.2 3.7 0 7.4-3.8 7.4-7.4 0-3.1-6.1-17.4-10.2-23.6-7.7-12.1-20.1-23.2-33.5-29.9L469 430V282.2c-.1-118.2-.3-148.2-1.4-150-2.7-5-6.2-6.2-18.3-6.2H438v-11c0-12.1-1-15.5-5.4-18.4-2.3-1.5-12.7-1.6-122.1-1.6H191v-4c0-5.3-2.3-9.6-6.3-12-3.1-1.9-5.4-2-57.3-2H73.3l-3.4 2.3zM176 141.7v49.7l-3.6-4.3c-2-2.3-6.7-6.4-10.4-8.9l-6.6-4.7 2.7-3.9c5.1-6.9 7.1-14.1 6.7-23.6-.6-14.7-7.8-25.9-20.7-32.3-6.1-3-7.3-3.2-16.6-3.2-8.7 0-10.7.3-15.7 2.7-19.4 9.1-27.5 32.1-18.1 51.4 1.4 3 3.4 6.1 4.4 7 1.8 1.6 1.5 1.9-5 6.5-3.7 2.6-8.5 6.7-10.5 9l-3.6 4.3V92h97v49.7zM423 118v8h-89c-87.7 0-89 0-91 2-3 3-2.7 8.3.6 10.9 2.7 2.1 3 2.1 106.5 2.1H454v284.5l-14.8.1c-13.6 0-15.4.3-23.9 3.1-21.6 7.2-38.3 21.1-48.2 40.2-6.2 11.9-8.2 19.9-8.8 33.6-.8 17.3 1 25.6 9.4 44.3.4.9-23.1 1.2-115.6 1.2H136V237h22.3c25.1 0 27.8-.6 30.9-7 1.6-3.2 1.8-7.6 1.8-46.3V141h11.9c10.5 0 12.1-.2 14.5-2.1 3.3-2.6 3.6-7.9.6-10.9-1.8-1.8-3.3-2-14.5-2H191v-16h232v8zm-285.1 9.5c8.1 4.1 12.1 10.8 12.1 20.3 0 12.9-9.6 22.3-22.6 22.3-13 0-22.5-9.5-22.5-22.6 0-17.2 17.5-27.9 33-20zm-15.4 57.4c2.9.5 7.8.4 11.8-.1 6.5-1 7-.9 13.1 2.1 11 5.4 23.2 20.5 26.1 32.3l.7 2.8H80.8l.6-2.8c2.7-11.5 14.9-26.7 25.9-32.2 6.4-3.2 7.4-3.3 15.2-2.1zM121 377v140h-16V237h16v140z"/><path d="M253 186c-3 3-2.7 8.3.6 10.9 2.6 2 3.7 2.1 41.4 2.1 37.7 0 38.8-.1 41.4-2.1 3.3-2.6 3.6-7.9.6-10.9-1.9-1.9-3.3-2-42-2s-40.1.1-42 2zM227.1 224.6c-2.6 3.3-2.7 6.5-.2 9.5l1.9 2.4 63.9.3c35.1.1 64.8 0 66.1-.3 3.2-.8 6.2-4.1 6.2-6.9 0-1.3-.9-3.5-2.1-5l-2-2.6H229.1l-2 2.6zM170.5 287.2c-4.9 2.6-6 7.9-2.5 11.6l2.1 2.2h249.6l2.1-2.3c3.6-3.8 2.8-8.8-1.9-11.2-2.4-1.3-19.7-1.5-125.1-1.5-86.6.1-122.9.4-124.3 1.2zM170.3 325c-4.6 1.9-5.7 8.3-2 11.8l2.3 2.2h249.1l2.1-2.3c2.7-2.9 2.8-6.7.3-9.8l-1.9-2.4-123.9-.2c-70.1-.1-124.7.2-126 .7zM168.5 364.4c-3.2 3.2-3.3 7.5-.2 10.4l2.3 2.2h249.3l2-2.6c2.6-3.3 2.7-6.5.2-9.5l-1.9-2.4-124.6-.3-124.7-.2-2.4 2.4zM172.4 421c-1.2.4-3.1 2.1-4.3 3.6-2 2.5-2.1 3.7-2.1 23.8 0 23.4.4 25 6 27.9 3.1 1.6 6.2 1.7 29.8 1.5l26.4-.3 2.9-3.3 2.9-3.2v-22.3c0-21.3-.1-22.4-2.1-24.6-1.1-1.2-3.2-2.6-4.6-3.2-3-1.1-52-1.1-54.9.1zm46.6 28v14h-38v-28h38v14zM168.5 498.5c-1.4 1.3-2.5 3.6-2.5 5s1.1 3.7 2.5 5l2.4 2.5h103.2l2.4-2.5c1.4-1.3 2.5-3.6 2.5-5s-1.1-3.7-2.5-5l-2.4-2.5H170.9l-2.4 2.5zM502.5 127.9c-2.2 1-5.5 3.3-7.2 5.1-6.7 6.9-6.4.5-6.1 116.5l.3 105 6.8 17.5c7.3 19 9.4 22 15.2 22 5.8 0 7.9-3 15.2-22l6.8-17.5.3-45.2c.3-44.4.2-45.3-1.8-47.3-3-3-8.3-2.7-10.9.6-2 2.6-2.1 3.8-2.1 33.5V327h-15v-90.4c0-89.9 0-90.3 2.1-93 1.5-1.9 3-2.6 5.4-2.6 2.4 0 3.9.7 5.4 2.6 2.1 2.6 2.1 3.7 2.1 46.4 0 42.7 0 43.8 2.1 46.4 2.6 3.3 7.9 3.6 10.9.6 1.9-1.9 2-3.3 2-47.4 0-29.5-.4-46.5-1.1-48.3-4.6-12.5-18.8-18.7-30.4-13.4zM519 345.4c0 3.2-6.8 24.1-7.6 23.3-1.3-1.3-7.4-20.5-7.4-23.2V342h15v3.4zM473.5 478c-1.1.5-11.2 10.1-22.5 21.4L430.6 520l-12.7-12.5c-13.8-13.7-15.8-14.7-20.4-10-4.9 4.8-4 6.4 13.8 24.2C426 536.4 427.9 538 431 538c3.1 0 5.5-2.1 28.2-24.8 23.3-23.3 24.8-25 24.8-28.4 0-5.7-5.2-9.1-10.5-6.8z"/></svg>

  const svgMap = {
    'company': companySvg,
    'users': usersSvg,
    'activeJobOffer': activeJobOfferSvg,
    'jobOffer': jobOfferSvg,
  };

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {svgMap[props.imageName]}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
          {props.value}
          </h4>
          <span className="text-sm font-medium"> {props.title} </span>
        </div>
        
        {props.hasUpdates && 
          <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
            {props.updatesPercentage}
            <svg width="10" height="11" className="fill-meta-3" xmlns="http://www.w3.org/2000/svg"><path d="M4.357 2.477L.91 5.83 0 4.946 5 .085l5 4.861-.909.884-3.448-3.353v7.608H4.357V2.477z"/></svg>
          </span>
        }
      </div>
    </div>
  );
};

export default Card;