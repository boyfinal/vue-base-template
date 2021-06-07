<template>
    <nav class="nav">
        <ul class="menu">
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
    </nav>
</template>
<script lang="ts">
export default {
    name: "Header",
};
</script>

<style lang="scss" scoped>
ul.menu {
    li {
      font-weight: 600;
        list-style: none;
        display: inline-block;
        padding: 10px 15px;
        cursor: pointer;
        &:hover {
          color: #000;
        }
    }
}
</style>
