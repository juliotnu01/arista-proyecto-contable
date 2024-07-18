<template>
    <section>
        <tableComponent :data="DataTable">
            <template v-slot:body="{ row }">
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                    {{ row.costo }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                    {{ row.concepto }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                    {{ row.tercero }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                    {{ row.centro_costo }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                    {{ row.debito }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                    {{ row.credito }}
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-center">
                    <div class="flex justify-center gap-4">
                        <button
                            class="w-fit h-fit p-2  text-sm font-medium    focus:bg-blue-300  rounded-full block  border-b border-blue-300 bg-blue-200 hover:bg-blue-300 text-blue-900">
                            <svg width="15px" height="15px" viewBox="0 0 32 32" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                                    sketch:type="MSPage">
                                    <g id="Icon-Set" sketch:type="MSLayerGroup"
                                        transform="translate(-464.000000, -1087.000000)" fill="#000000">
                                        <path
                                            d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z"
                                            id="plus-circle" sketch:type="MSShapeGroup">

                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <button
                            class="w-fit h-fit p-2  text-sm font-medium    focus:bg-blue-300  rounded-full block  border-b border-orange-300 bg-orange-200 hover:bg-orange-300 text-orange-900">
                            <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 20H20.5M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
    </section>
</template>

<script setup>
import tableComponent from '../components/formComponents/tableComponent.vue';
import inputText from '../components/formComponents/inputText.vue';
import { ref } from 'vue';

const DataTable = ref({
    cabecera: [
        { label: 'Codigo' },
        { label: 'Concepto' },
        { label: 'Tercero' },
        { label: 'Centro de costo' },
        { label: 'Debito' },
        { label: 'Credito' },
        { label: 'Accion' },
    ],
    body: [
        { costo: 1000, concepto: 'asdasd', tercero: 'asdas', centro_costo: 'asda', debito: 12312, credito: 12312 },
        { costo: 1000, concepto: 'asdasd', tercero: 'asdas', centro_costo: 'asda', debito: 12312, credito: 12312 },
        { costo: 1000, concepto: 'asdasd', tercero: 'asdas', centro_costo: 'asda', debito: 12312, credito: 12312 },
    ]
})

</script>