
<template>
  <div style="width: 100%; height: 400px;">
    <amap
      cache-key="home-map"
      map-style="amap://styles/whitesmoke"
      :zoom="15"
      :center="[116.473179, 39.993169]"
    >
      <amap-marker
        :position="[116.473179, 39.993169]"
        :label="{
          content: 'Hello, AMap-Vue!',
          direction: 'bottom',
        }"
      />
    </amap>
  </div>
</template>
