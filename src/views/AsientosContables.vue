<template>
    <section>
        <tableComponent :data="DataTable">
            <template v-slot:body="{ row }">
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                    {{ row.docu_nume }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                    {{ row.docu_fech }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                    {{ row.tipoDocummento.tido_nomb ?? '' }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                    {{ row.periodo.peri_desc ?? '' }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                    $ {{ formatter.format(row.docu_cred) }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                    $ {{ formatter.format(row.docu_debi) }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                    <div class="flex justify-center gap-4">
                        <button @click="EditDocumento(row)"
                            class="w-fit h-fit p-2  text-sm font-medium    focus:bg-blue-300  rounded-full block  border-b border-orange-300 bg-orange-200 hover:bg-orange-300 text-orange-900">
                            <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 20H20.5M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6"
                                    stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>
                        <button
                            class="w-fit h-fit p-2  text-sm font-medium    focus:bg-blue-300  rounded-full block  border-b border-red-300 bg-red-200 hover:bg-red-300 text-red-900">
                            <svg width="15px" height="15px" viewBox="0 -0.5 21 21" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)"
                                        fill="#000000">
                                        <g id="icons" transform="translate(56.000000, 160.000000)">
                                            <path
                                                d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z"
                                                id="delete-[#1487]">

                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </div>
                </td>
            </template>
        </tableComponent>
        <!-- Modal Edit Documento -->
        <TransitionRoot as="template" :show="open">
            <Dialog class="relative z-10" @close="open = false">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>
                <div class="fixed inset-0 z-10 w-screen overflow-y-auto ">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                        <TransitionChild as="template" enter="ease-out duration-300"
                            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                            leave-from="opacity-100 translate-y-0 sm:scale-100"
                            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <DialogPanel
                                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ">
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="flex gap-4 justify-around ">
                                        <div class="m-4">
                                            <label for="">
                                                Periodo
                                            </label>
                                            <input type="text" v-model="selectedPeriodoDesc" list="options-list-periodo"
                                                @change="handlePeriodo"
                                                class="h-8 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            <datalist id="options-list-periodo">
                                                <option v-for="(periodo, p) in periodos" :key="p"
                                                    :value="periodo.peri_desc">
                                                    {{ periodo.peri_desc }}
                                                </option>
                                            </datalist>
                                        </div>
                                        <div class="m-4">
                                            <label for="">
                                                Fecha documento
                                            </label>
                                            <input :min="minCalendar" :max="maxCalendar" type="date"
                                                v-model="FechaDocumento"
                                                class="h-8  border mt-1 rounded px-4 w-full bg-gray-50">
                                        </div>
                                        <div class="m-4">
                                            <label for="">
                                                Tipo documento
                                            </label>
                                            <input type="text" v-model="selectedTipoDocumentoDesc"
                                                list="options-list-tipo-documento" @change="handleTipoDocumento"
                                                class="h-8 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            <datalist id="options-list-tipo-documento">
                                                <option v-for="(tipoDocumento, p) in tiposDocumentos" :key="p"
                                                    :value="tipoDocumento.tido_nomb">
                                                    {{ tipoDocumento.tido_nomb }}
                                                </option>
                                            </datalist>
                                        </div>
                                        <div class="m-4">
                                            <label for="">
                                                Numero de documento
                                            </label>
                                            <input type="text" v-model="numeroDocumento"
                                                class="h-8 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                    </div>
                                    <div class="py-4 max-h-96 overflow-y-scroll">
                                        <tableComponent :data="DataTableAsientos">
                                            <template v-slot:body="{ row }">
                                                <td v-if="row.editar">
                                                    <div class="flex justify-center gap-4">
                                                        <button @click.prevent="EditAsiento(row)"
                                                            class="w-fit h-fit p-2  text-sm font-medium    rounded-full block  border-b border-green-300 bg-green-200 hover:bg-green-300 text-green-900">
                                                            <svg width="15px" height="15px" viewBox="0 0 24 24"
                                                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M4 12.6111L8.92308 17.5L20 6.5"
                                                                    stroke="#000000" stroke-width="2"
                                                                    stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td class="px-4 py-4 text-sm  whitespace-nowrap text-center">
                                                    <div v-if="!row.editar">
                                                        {{ row.puc_id }}
                                                    </div>
                                                    <div class="m-4 relative" v-else>
                                                        <input type="text" :list="`options-list-puc-${row.asco_id}`"
                                                            v-model="row.codigo"
                                                            @change="handlePucEditAsiento($event, row)"
                                                            class="h-8 border mt-1 rounded px-4 w-full " />
                                                        <datalist :id="`options-list-puc-${row.asco_id}`"
                                                            class="absolute">
                                                            <option v-for="(puc, p) in pucs" :key="p"
                                                                :value="`${puc.puc_nomb} ${puc.puc_codi}`"
                                                                :data-custom="puc.puc_codi" />

                                                        </datalist>
                                                    </div>
                                                </td>
                                                <td
                                                    class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                                                    <div v-if="!row.editar">
                                                        {{ row.asco_conc }}
                                                    </div>
                                                    <div class="m-4 relative" v-else>
                                                        <input type="text" v-model="row.concepto"
                                                            class="h-8 border mt-1 rounded px-4 w-full " />
                                                    </div>
                                                </td>
                                                <td
                                                    class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                                                    <div v-if="!row.editar">
                                                        {{ row.terc_id }}
                                                    </div>
                                                    <div class="m-4 relative" v-else>
                                                        <input type="text" :list="`options-list-tercero-${row.asco_id}`"
                                                            v-model="row.tercero"
                                                            @change="handleTerceroEditAsiento($event, row)"
                                                            class="h-8 border mt-1 rounded px-4 w-full " />
                                                        <datalist :id="`options-list-tercero-${row.asco_id}`"
                                                            class="absolute">
                                                            <option v-for="(tercero, p) in terceros" :key="p"
                                                                :value="`${tercero.terc_nomb1} ${tercero.terc_apel} ${tercero.terc_iden} `" />

                                                        </datalist>
                                                    </div>
                                                </td>
                                                <td
                                                    class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                                                    <div v-if="!row.editar">
                                                        {{ row.ceco_id }}
                                                    </div>
                                                    <div class="m-4 relative" v-else>
                                                        <input type="text" :list="`options-list-puc-${row.asco_id}`"
                                                            v-model="row.codigo"
                                                            @change="handlePucEditAsiento($event, row)"
                                                            class="h-8 border mt-1 rounded px-4 w-full " />
                                                        <datalist :id="`options-list-puc-${row.asco_id}`"
                                                            class="absolute">
                                                            <option v-for="(puc, p) in pucs" :key="p"
                                                                :value="`${puc.puc_nomb} ${puc.puc_codi}`"
                                                                :data-custom="puc.puc_codi" />

                                                        </datalist>
                                                    </div>
                                                </td>
                                                <td
                                                    class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                                                    <div v-if="!row.editar">
                                                        $ {{ formatter.format(row.asco_debi) }}
                                                    </div>
                                                    <div class="m-4 relative" v-else>
                                                        <input type="number" v-model="row.concepto"
                                                            class="h-8 border mt-1 rounded px-4 w-full " />
                                                    </div>
                                                </td>
                                                <td
                                                    class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                                                    <div v-if="!row.editar">
                                                        $ {{ formatter.format(row.asco_cred) }}
                                                    </div>
                                                    <div class="m-4 relative" v-else>
                                                        <input type="number" v-model="row.concepto"
                                                            class="h-8 border mt-1 rounded px-4 w-full " />
                                                    </div>
                                                </td>
                                                <td
                                                    class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                                                    <div class="flex justify-center gap-4">
                                                        <button
                                                            class="w-fit h-fit p-2  text-sm font-medium    focus:bg-blue-300  rounded-full block  border-b border-blue-300 bg-blue-200 hover:bg-blue-300 text-blue-900">
                                                            <svg width="15px" height="15px" viewBox="0 0 32 32"
                                                                version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                                                xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                                                                <g id="Page-1" stroke="none" stroke-width="1"
                                                                    fill="none" fill-rule="evenodd"
                                                                    sketch:type="MSPage">
                                                                    <g id="Icon-Set" sketch:type="MSLayerGroup"
                                                                        transform="translate(-464.000000, -1087.000000)"
                                                                        fill="#000000">
                                                                        <path
                                                                            d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z"
                                                                            id="plus-circle" sketch:type="MSShapeGroup">

                                                                        </path>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </button>
                                                        <button v-if="!row.editar" @click.prevent="EditAsiento(row)"
                                                            class="w-fit h-fit p-2  text-sm font-medium    focus:bg-blue-300  rounded-full block  border-b border-orange-300 bg-orange-200 hover:bg-orange-300 text-orange-900">
                                                            <svg width="15px" height="15px" viewBox="0 0 24 24"
                                                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M12 20H20.5M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6"
                                                                    stroke="#000000" stroke-width="1.5"
                                                                    stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            class="w-fit h-fit p-2  text-sm font-medium    focus:bg-blue-300  rounded-full block  border-b border-red-300 bg-red-200 hover:bg-red-300 text-red-900">
                                                            <svg width="15px" height="15px" viewBox="0 -0.5 21 21"
                                                                version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                                <g id="Page-1" stroke="none" stroke-width="1"
                                                                    fill="none" fill-rule="evenodd">
                                                                    <g id="Dribbble-Light-Preview"
                                                                        transform="translate(-179.000000, -360.000000)"
                                                                        fill="#000000">
                                                                        <g id="icons"
                                                                            transform="translate(56.000000, 160.000000)">
                                                                            <path
                                                                                d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z"
                                                                                id="delete-[#1487]">

                                                                            </path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </template>
                                        </tableComponent>
                                    </div>
                                </div>
                                <div class="flex gap-4 px-10 justify-between my-2">
                                    <div>
                                        <p class="font-bold text-[20px] capitalize ">debito</p>
                                        <p>$ {{ footerDocumento.Debito }}</p>
                                    </div>
                                    <div>
                                        <p class="font-bold text-[20px] capitalize">CREDITO</p>
                                        <p>$ {{ footerDocumento.Credito }}</p>
                                    </div>
                                    <div>
                                        <p class="font-bold text-[20px] capitalize">DIFERENCIA</p>
                                        <p>$ {{ footerDocumento.Diferencia }}</p>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button"
                                        class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        @click="open = false">Deactivate</button>
                                    <button type="button"
                                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        @click="open = false" ref="cancelButtonRef">Cancel</button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </section>

</template>

<script setup>
import tableComponent from '../components/formComponents/tableComponent.vue';
import inputText from '../components/formComponents/input.vue';
import selectIntput from '../components/formComponents/select.vue';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { onMounted, ref } from 'vue';
import axios from 'axios';

const DataTable = ref({
    cabecera: [
        { label: 'Numero de documento' },
        { label: 'Fecha de documento' },
        { label: 'Tipo de documento' },
        { label: 'Periodo' },
        { label: 'Credito' },
        { label: 'Periodo' },
        { label: 'Accion' },
    ],
    body: []
})
const DataTableAsientos = ref({
    cabecera: [
        { label: 'Codigo' },
        { label: 'Concepto' },
        { label: 'Tercero' },
        { label: 'Centro de costo' },
        { label: 'Debito' },
        { label: 'Credito' },
        { label: 'Accion' },
    ],
    body: []
})
const open = ref(false)
const footerDocumento = ref({
    Debito: 0,
    Credito: 0,
    Diferencia: 0
})
const selectedPeriodo = ref(null);
const selectedTipoDocumento = ref(null);
const periodos = ref([])
const tiposDocumentos = ref([])
const minCalendar = ref(null);
const maxCalendar = ref(null);
const selectedPeriodoDesc = ref(null);
const selectedTipoDocumentoDesc = ref(null);
const FechaDocumento = ref(null);
const numeroDocumento = ref(null);
const pucs = ref(null);
const pucSelectedDec = ref(null);
const terceros = ref([]);
const terceroSelectedDec = ref(null);


const getDocumentos = async () => {
    try {
        let { data } = await axios('http://localhost:3000/documentos')
        for (let index = 0; index < data.length; index++) {
            const documento = data[index];

            for (const iterator of documento.asientos_contables) {
                iterator.editar = false
                iterator.codigo = ''
                iterator.concepto = ''
                iterator.tercero = ''
                iterator.centro_costo = ''
                iterator.debito = ''
                iterator.credito = ''
            }

        }
        DataTable.value.body = data
    } catch (error) {
        console.log(error)
    }
}
const formatter = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
const EditDocumento = async (documento = null) => {
    open.value = true
    footerDocumento.value.Debito = formatter.format(documento.docu_debi)
    footerDocumento.value.Credito = formatter.format(documento.docu_cred)
    footerDocumento.value.Diferencia = formatter.format((documento.docu_debi - documento.docu_cred))
    const { peri_desc = '' } = documento.periodo;
    const { docu_fech = '', docu_nume = '' } = documento;
    const { tido_nomb = '' } = documento.tipoDocummento;
    selectedPeriodoDesc.value = peri_desc;
    DeterminateFechaCalendar(peri_desc)
    FechaDocumento.value = docu_fech
    selectedTipoDocumentoDesc.value = tido_nomb
    numeroDocumento.value = docu_nume
    DataTableAsientos.value.body = documento.asientos_contables
}
const getPeriodo = async () => {
    try {
        let { data } = await axios('http://localhost:3000/periodo')
        periodos.value = data
    } catch (error) {
        console.log(error);
    }
}
const getTipoDocumento = async () => {
    try {
        let { data } = await axios('http://localhost:3000/tipo-documento')
        tiposDocumentos.value = data
    } catch (error) {
        console.log(error);
    }
}
const getTipoTerceros = async () => {
    try {
        let { data } = await axios('http://localhost:3000/terceros')
        terceros.value = data
    } catch (error) {
        console.log(error);
    }
}
const getPucs = async () => {
    try {
        let { data } = await axios('http://localhost:3000/puc')
        pucs.value = data
    } catch (error) {
        console.log(error);
    }
}
const handlePeriodo = (event = null) => {
    const selectedDesc = event.target.value;
    const selectedOption = periodos.value.find(periodo => periodo.peri_desc === selectedDesc);
    if (selectedOption) {
        selectedPeriodo.value = selectedOption.peri_id;
    } else {
        selectedPeriodo.value = null;
    }
    FechaDocumento.value = null;
    const data = selectedDesc ?? '';
    if (data) {

        DeterminateFechaCalendar(data)
    }
}
const handlePucEditAsiento = (event = null, asiento) => {
    const selectedDesc = event.target.value;
    let codigo = selectedDesc.match(/\d+/g)
    const selectedOption = pucs.value.find(puc => puc.puc_codi === codigo[0]);
    if (selectedOption) {
        pucSelectedDec.value = selectedOption.puc_id;
    } else {
        pucSelectedDec.value = null;
    }

}
const handleTerceroEditAsiento = (event = null, asiento) => {
    const selectedDesc = event.target.value;
    let identificacion = selectedDesc.match(/\d+/g)
    const selectedOption = terceros.value.find(puc => puc.terc_iden === identificacion[0]);
    if (selectedOption) {
        terceroSelectedDec.value = selectedOption.terc_id;
    } else {
        terceroSelectedDec.value = null;
    }
    console.log({ terceroSelectedDec });
}

const handleTipoDocumento = (event = null) => {
    const selectedDesc = event.target.value;
    const selectedOption = tiposDocumentos.value.find(tipoDocumento => tipoDocumento.tido_nomb === selectedDesc);
    if (selectedOption) {
        selectedTipoDocumento.value = selectedOption.tido_id;
    } else {
        selectedTipoDocumento.value = null;
    }

}
const DeterminateFechaCalendar = (data = null) => {
    const [a, mesTexto] = data.split('/');
    const meses = {
        "Enero": "01",
        "Febrero": "02",
        "Marzo": "03",
        "Abril": "04",
        "Mayo": "05",
        "Junio": "06",
        "Julio": "07",
        "Agosto": "08",
        "Septiembre": "09",
        "Octubre": "10",
        "Noviembre": "11",
        "Diciembre": "12"
    };
    const mesNumero = meses[mesTexto];
    minCalendar.value = `${a}-${mesNumero}-01`;
    maxCalendar.value = new Date(a, mesNumero, 0).toISOString().split('T')[0];
    console.log(minCalendar.value, maxCalendar.value);
}
const EditAsiento = async (asiento = null) => {
    asiento.editar = !asiento.editar
    if (asiento.editar) {
        DataTableAsientos.value.cabecera.unshift({ label: '' })
    } else {
        DataTableAsientos.value.cabecera.shift()
    }
}

onMounted(() => {
    getDocumentos();
    getPeriodo();
    getTipoDocumento();
    getPucs();
    getTipoTerceros();
})

</script>