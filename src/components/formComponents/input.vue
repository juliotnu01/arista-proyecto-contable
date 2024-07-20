<template>
    <div class="m-4">
        <label >{{props.label}}</label>
        <input :type="props.type"  class=" h-8  border mt-1 rounded px-4 w-full bg-gray-50" :placeholder="props.placeholder"  />
    </div>
</template>
<script setup>
const props = defineProps({
    tipoInput: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
    },
    label: {
        type: String,
    }


});
</script>
