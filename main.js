function selectIndicator (selectorNumber){
    if (selectorNumber === 1){
        $('#simon-selector-1').addClass("quadrant-selected pulse")}
    if (selectorNumber === 2){
        $('#simon-selector-2').addClass("quadrant-selected pulse")}
    if (selectorNumber === 3){
        $('#simon-selector-3').addClass("quadrant-selected pulse")}
     if (selectorNumber === 4){
        $('#simon-selector-4').addClass("quadrant-selected pulse")}
}
function unIndicate (selectorNumber){
    if (selectorNumber === 1){
        $('#simon-selector-1').removeClass("quadrant-selected pulse")}
    if (selectorNumber === 2){
        $('#simon-selector-2').removeClass("quadrant-selected pulse")}
    if (selectorNumber === 3){
        $('#simon-selector-3').removeClass("quadrant-selected pulse")}
     if (selectorNumber === 4){
        $('#simon-selector-4').removeClass("quadrant-selected pulse")}
}

$('#simon-selector-1').click(function(){
    selectIndicator(1);
})
$('#simon-selector-2').click(function(){
    selectIndicator(2);
})
$('#simon-selector-3').click(function(){
    selectIndicator(3);
})
$('#simon-selector-4').click(function(){
    selectIndicator(4);
})