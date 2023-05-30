<script>
	import Input from "$lib/components/utils/Input.svelte";
	import FilterSelect from "./filters/FilterSelect.svelte";
	import FilterSelectContainer from "./filters/FilterSelectContainer.svelte";

</script>


<div class="flex flex-col bg-base-100 mt-10 p-5 rounded-lg shadow">
    <Input label="Buscar por codigo" props="bg-transparent" mandatory={false}/>

    <FilterSelectContainer>
        <FilterSelect/>
        <FilterSelect/>
        <FilterSelect/>
        <FilterSelect/>
    </FilterSelectContainer>
</div>