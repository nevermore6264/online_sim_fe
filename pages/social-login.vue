<template>
    <div>Processing login...</div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    // Get the current URL
    const currentUrl = window.location.href;
    console.log('Callback URL:', currentUrl);

    // Store the URL in localStorage for the main window to process
    localStorage.setItem('googleCallbackUrl', currentUrl);

    // Close this window
    window.close();
});
</script>