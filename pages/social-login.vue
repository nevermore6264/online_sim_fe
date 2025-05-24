<template>
    <div>Processing login...</div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    try {
        // Get accessToken from URL
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');

        console.log('Access Token from URL:', accessToken);

        if (accessToken && window.opener) {
            // Send message to main window
            window.opener.postMessage({ accessToken }, '*');
            window.close();
        }
    } catch (error) {
        console.error('Error processing login:', error);
        window.close();
    }
});
</script>