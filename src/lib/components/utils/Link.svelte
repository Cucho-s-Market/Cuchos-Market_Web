<script>
    // @ts-nocheck
    export let href = '#';
    export let text = '';
    export let type = 'link-primary';
    export let target = true;

    (target ? target = '_blank' : target = '');
</script>

<a class="link {type}" href="{href}" target="{target}">{text}</a>
