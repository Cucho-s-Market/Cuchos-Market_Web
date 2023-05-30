<script>
	import Input from "$lib/components/utils/Input.svelte";
	import FilterSelect from "./filters/FilterSelect.svelte";
	import FilterSelectContainer from "./filters/FilterSelectContainer.svelte";

</script>


<div class="flex flex-col bg-base-100 mt-10 p-5 rounded-lg shadow-md">
    <Input label="Buscar por codigo" mandatory={false}/>

    <FilterSelectContainer>
        <FilterSelect/>
        <FilterSelect/>
        <FilterSelect/>
        <FilterSelect/>
    </FilterSelectContainer>
</div>