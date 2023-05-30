<script>
    import AdminHeader from "$lib/components/admin/common/AdminHeader.svelte";
import SideMenu from "$lib/components/admin/common/SideMenu/SideMenu.svelte";
</script>

<div class="flex">
    <SideMenu/>
    <AdminHeader/>
    <main class="mt-20 p-10">
        <slot/>
    </main>
</div>