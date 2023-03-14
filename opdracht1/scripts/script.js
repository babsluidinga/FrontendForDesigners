// Avada Kedavra curse
var avadaKedavra = document.querySelector('button');

avadaKedavra.addEventListener('click', LetsCurse);

function LetsCurse(){
    document.documentElement.classList.toggle('cursed');
};
// Source:https://stackoverflow.com/questions/37801882/how-to-change-css-root-color-variables-in-javascript