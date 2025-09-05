<template>
  <div class="container">
    <h1>Frontend Drools - Descuentos e Impuestos</h1>

    <!-- Formulario Descuento -->
    <section>
      <h2>Calcular Descuento</h2>
      <form @submit.prevent="calcularDescuento">
        <input v-model="cliente.nombre" placeholder="Nombre" />
        <input v-model.number="cliente.edad" type="number" placeholder="Edad" />
        <input v-model.number="cliente.compra" type="number" placeholder="Monto de compra" />
        <button type="submit">Calcular</button>
      </form>

      <div v-if="resultadoDescuento">
        <p><b>Nombre:</b> {{ resultadoDescuento.nombre }}</p>
        <p><b>Edad:</b> {{ resultadoDescuento.edad }}</p>
        <p><b>Compra:</b> {{ resultadoDescuento.compra }}</p>
        <p><b>Descuento:</b> {{ resultadoDescuento.descuento }}</p>
      </div>
    </section>

    <hr />

    <!-- Formulario Impuesto -->
    <section>
      <h2>Calcular Impuesto</h2>
      <form @submit.prevent="calcularImpuesto">
        <input v-model="factura.numero" placeholder="Número de Factura" />
        <input v-model.number="factura.monto" type="number" placeholder="Monto de Factura" />
        <button type="submit">Calcular</button>
      </form>

      <div v-if="resultadoImpuesto">
        <p><b>Factura:</b> {{ resultadoImpuesto.numero }}</p>
        <p><b>Monto:</b> {{ resultadoImpuesto.monto }}</p>
        <p><b>IVA:</b> {{ resultadoImpuesto.iva }}</p>
      </div>
    </section>

    <!-- Mensaje de reporte -->
    <div v-if="mensajeReporte" class="mensaje">
      ✅ {{ mensajeReporte }}
    </div>

    <!-- Mensaje de error -->
    <div v-if="error" style="color:red">
      ❌ Error: {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"

const cliente = ref({ nombre: "", edad: null, compra: null })
const factura = ref({ numero: "", monto: null })

const resultadoDescuento = ref(null)
const resultadoImpuesto = ref(null)
const error = ref(null)
const mensajeReporte = ref(null)

const calcularDescuento = async () => {
  try {
    error.value = null
    mensajeReporte.value = null
    const { data } = await axios.post("/app/api/descuento", cliente.value)
    resultadoDescuento.value = data
    await generarReporte("descuento")
  } catch (err) {
    error.value = err.message
  }
}

const calcularImpuesto = async () => {
  try {
    error.value = null
    mensajeReporte.value = null
    const { data } = await axios.post("/app/api/impuesto", factura.value)
    resultadoImpuesto.value = data
    await generarReporte("impuesto")
  } catch (err) {
    error.value = err.message
  }
}

const generarReporte = async (tipo) => {
  try {
    const { data } = await axios.post("/app/coverage/generate")
    mensajeReporte.value = `Reporte generado correctamente tras cálculo de ${tipo}`
    console.log("✅ Reporte generado:", data)
  } catch (err) {
    error.value = "Error al generar reporte: " + err.message
  }
}
</script>

<style>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}
button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
}
button:hover {
  background-color: #2c8a62;
}
.mensaje {
  margin-top: 15px;
  padding: 10px;
  background: #e6ffe6;
  color: #2c8a62;
  border: 1px solid #42b883;
  border-radius: 5px;
}
</style>
