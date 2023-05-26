<script>

    //https://dummyimage.com/100/09f.png/fff
    export let srcPhotoA = 'https://a6p8a2b3.stackpathcdn.com/gKEgOJqsQRvm5zbo45ba7yTdaFM=/702x526/smart/rockol-img/img/foto/upload/beavis-and-butthead.jpg';
    export let srcPhotoB = '';
    export let srcPhotoC = '';
    export let srcPhotoD = '';

    let sharedStyles = "rounded-md"
    let sideStyles = " "
    let mainStyles = "w-full object-cover object-cover col-span-8"
    let imgStyles = "border-2 rounded-md h-inherit w-full object-cover border-orange-400 drop-shadow hover:drop-shadow-lg"
</script>

<div class="grid grid-cols-2  sm:grid-cols-9 gap-2 m-2">
    <div class="grid grid-cols-4 sm:grid-cols-1 sm:grid-rows-6 w-full gap-2 justify-around">
        <div class= '{sideStyles} {sharedStyles}'>
            <img src="{srcPhotoA}" alt="asd" class='{imgStyles}'>
        </div>
        <div class= '{sideStyles} {sharedStyles}'>
            <img src="{srcPhotoA}" alt="asd" class='{imgStyles}'>
        </div>
        <div class= '{sideStyles} {sharedStyles}'>
            <img src="{srcPhotoA}" alt="asd" class='{imgStyles}' >
        </div>
        <div class= '{sideStyles} {sharedStyles}'>
            <img src="{srcPhotoA}" alt="asd" class='{imgStyles}' >
        </div>
    </div>
    <div class="grid gap-2 col-span-8 center">
        <div class='{mainStyles} {sharedStyles}'>
            <img src="{srcPhotoA}" alt="asd" class='{imgStyles}'>
        </div>
    </div>

</div>
