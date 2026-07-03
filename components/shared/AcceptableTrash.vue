<template>
  <div class="trash-grid">
    <!-- Acceptable Residential -->
    <div class="trash-card">
      <p class="trash-card-title">
        <v-icon small color="#27ae60" style="margin-right:6px;vertical-align:middle">check_circle</v-icon>
        Acceptable Residential
      </p>
      <ul>
        <li>Household Garbage</li>
        <li>Cat or Dog Pet waste (double bagged only)</li>
      </ul>
    </div>

    <!-- Acceptable Commercial -->
    <div class="trash-card">
      <p class="trash-card-title">
        <v-icon small color="#27ae60" style="margin-right:6px;vertical-align:middle">check_circle</v-icon>
        Acceptable Commercial
      </p>
      <ul>
        <li>Office Garbage / Trash</li>
      </ul>
    </div>

    <!-- Not Accepted (applies to both residential & commercial) -->
    <div class="trash-card" style="grid-column: 1 / -1;">
      <p class="trash-card-title unaccepted">
        <v-icon small color="#e74c3c" style="margin-right:6px;vertical-align:middle">cancel</v-icon>
        Not Accepted (Residential &amp; Commercial)
      </p>
      <ul class="trash-two-col">
        <li>Ammunition</li>
        <li>Appliances</li>
        <li>Asbestos</li>
        <li>Ashes, hot or cold</li>
        <li>Automobile batteries</li>
        <li>Compact fluorescent bulbs &amp; tubes (CFL)</li>
        <li>Dead animals</li>
        <li>Dirt, rocks or concrete</li>
        <li>Electronic waste (computers, TV, etc.)</li>
        <li>Household hazardous waste</li>
        <li>Liquid waste like paint</li>
        <li>Medical waste</li>
        <li>Motor oil</li>
        <li>Pharmaceuticals</li>
        <li>Recycling</li>
        <li>Sharps (needles or syringes)</li>
        <li>Tires</li>
        <li>Un-bagged packing pellets or sawdust</li>
        <li>Wood waste</li>
        <li>Yard waste</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.trash-two-col {
  columns: 2;
  column-gap: 32px;
}

@media (max-width: 500px) {
  .trash-two-col {
    columns: 1;
  }
}
</style>



