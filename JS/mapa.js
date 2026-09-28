document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MAPA
    ===================================================== */

    const map = L.map("map").setView(
        [13.6929, -89.2182],
        8
    );


    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "© OpenStreetMap"
        }
    ).addTo(map);



    /* =====================================================
       SUCURSALES
    ===================================================== */

    const sucursales = [

        {
            nombre: "PetCare Escalón",
            departamento: "San Salvador",
            direccion: "Paseo General Escalón",
            telefono: "2200-1100",
            horario: "7:00 AM - 10:00 PM",
            estado: "Abierta",
            coords: [13.7048, -89.2365]
        },


        {
            nombre: "PetCare Santa Elena",
            departamento: "La Libertad",
            direccion: "Antiguo Cuscatlán",
            telefono: "2200-1120",
            horario: "7:00 AM - 10:00 PM",
            estado: "Abierta",
            coords: [13.6765, -89.2402]
        },


        {
            nombre: "PetCare Santa Ana",
            departamento: "Santa Ana",
            direccion: "Centro de Santa Ana",
            telefono: "2200-1150",
            horario: "7:00 AM - 9:00 PM",
            estado: "Abierta",
            coords: [13.9942, -89.5597]
        },


        {
            nombre: "PetCare Sonsonate",
            departamento: "Sonsonate",
            direccion: "Centro de Sonsonate",
            telefono: "2200-1160",
            horario: "8:00 AM - 9:00 PM",
            estado: "Cerrada",
            coords: [13.7167, -89.7167]
        },


        {
            nombre: "PetCare San Miguel",
            departamento: "San Miguel",
            direccion: "Centro de San Miguel",
            telefono: "2200-1180",
            horario: "7:00 AM - 10:00 PM",
            estado: "Abierta",
            coords: [13.4833, -88.1833]
        }

    ];



    let marcadores = [];

    let ubicacionUsuario = null;



    /* =====================================================
       ELEMENTOS HTML
    ===================================================== */

    const branchList =
        document.getElementById("branchList");

    const searchInput =
        document.getElementById("searchInput");

    const departmentFilter =
        document.getElementById("departmentFilter");

    const btnLocate =
        document.getElementById("btnLocate");

    const btnReset =
        document.getElementById("btnReset");

    const toggleBranches =
        document.getElementById("toggleBranches");

    const closeBranches =
        document.getElementById("closeBranches");

    const branchPanel =
        document.getElementById("branchPanel");



    /* =====================================================
       ABRIR / CERRAR PANEL
    ===================================================== */

    toggleBranches.addEventListener(
        "click",
        function () {

            branchPanel.classList.toggle("open");

            toggleBranches.classList.toggle("active");

        }
    );


    closeBranches.addEventListener(
        "click",
        function () {

            branchPanel.classList.remove("open");

            toggleBranches.classList.remove("active");

        }
    );



    /* =====================================================
       CREAR ICONO
    ===================================================== */

    function crearIcono(estado) {

        const color =
            estado === "Abierta"
                ? "#2e9d68"
                : "#d95367";


        return L.divIcon({

            html: `

                <div style="
                    width:22px;
                    height:22px;

                    background:${color};

                    border:3px solid white;

                    border-radius:50%;

                    box-shadow:
                        0 3px 10px
                        rgba(0,0,0,.3);
                "></div>

            `,

            className: "",

            iconSize: [22, 22],

            iconAnchor: [11, 11]

        });

    }



    /* =====================================================
       CARGAR MARCADORES
    ===================================================== */

    function cargarMapa(lista) {


        marcadores.forEach(function (marker) {

            map.removeLayer(marker);

        });


        marcadores = [];


        lista.forEach(function (sucursal) {


            const marcador = L.marker(

                sucursal.coords,

                {
                    icon:
                        crearIcono(
                            sucursal.estado
                        )
                }

            ).addTo(map);



            marcador.bindPopup(`

                <div class="branch-popup">

                    <h3>
                        ${sucursal.nombre}
                    </h3>

                    <p>
                        📍 ${sucursal.direccion}
                    </p>

                    <p>
                        ☎ ${sucursal.telefono}
                    </p>

                    <p>
                        ⏰ ${sucursal.horario}
                    </p>

                    <p>
                        <strong>
                            ${sucursal.estado}
                        </strong>
                    </p>

                    <button
                        class="popup-route"
                        onclick="irSucursal(
                            ${sucursal.coords[0]},
                            ${sucursal.coords[1]}
                        )">

                        Cómo llegar

                    </button>

                </div>

            `);



            marcador.on(
                "click",
                function () {

                    map.setView(
                        sucursal.coords,
                        15,
                        {
                            animate: true
                        }
                    );

                }
            );


            marcadores.push(marcador);

        });

    }



    /* =====================================================
       CREAR TARJETAS
    ===================================================== */

    function cargarLista(lista) {


        branchList.innerHTML = "";


        if (lista.length === 0) {

            branchList.innerHTML = `

                <div class="no-results">

                    <i class="fa-solid fa-store-slash"></i>

                    <h3>
                        No encontramos sucursales
                    </h3>

                    <p>
                        Prueba con otro nombre
                        o departamento.
                    </p>

                </div>

            `;

            return;

        }



        lista.forEach(function (sucursal, index) {


            const card =
                document.createElement("article");


            card.className =
                "branch-card";


            if (index === 0) {

                card.classList.add("active");

            }



            const claseEstado =
                sucursal.estado === "Abierta"
                    ? "open"
                    : "closed";



            card.innerHTML = `

                <div class="branch-info">

                    <h2>
                        ${sucursal.nombre}
                    </h2>

                    <span class="status ${claseEstado}">

                        ${sucursal.estado}

                    </span>

                    <p>
                        📍 ${sucursal.direccion}
                    </p>

                    <p>
                        ☎ ${sucursal.telefono}
                    </p>

                    <p>
                        ⏰ ${sucursal.horario}
                    </p>

                </div>


                <div class="branch-buttons">

                    <button
                        class="viewMap">

                        <i class="fa-solid fa-location-dot"></i>

                        Ver mapa

                    </button>


                    <button
                        class="route">

                        <i class="fa-solid fa-route"></i>

                        Cómo llegar

                    </button>

                </div>

            `;



            /* VER MAPA */

            card
                .querySelector(".viewMap")
                .addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();


                        map.setView(
                            sucursal.coords,
                            16,
                            {
                                animate: true
                            }
                        );


                        const marker =
                            marcadores.find(
                                function (m) {

                                    return (
                                        m.getLatLng().lat ===
                                        sucursal.coords[0] &&

                                        m.getLatLng().lng ===
                                        sucursal.coords[1]
                                    );

                                }
                            );


                        if (marker) {

                            marker.openPopup();

                        }

                    }
                );



            /* CÓMO LLEGAR */

            card
                .querySelector(".route")
                .addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();


                        irSucursal(
                            sucursal.coords[0],
                            sucursal.coords[1]
                        );

                    }
                );



            /* CLICK TARJETA */

            card.addEventListener(
                "click",
                function () {

                    document
                        .querySelectorAll(
                            ".branch-card"
                        )
                        .forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                    card.classList.add(
                        "active"
                    );


                    map.setView(
                        sucursal.coords,
                        15,
                        {
                            animate: true
                        }
                    );

                }
            );


            branchList.appendChild(card);

        });

    }



    /* =====================================================
       FUNCIÓN CÓMO LLEGAR
    ===================================================== */

    window.irSucursal = function (
        lat,
        lng
    ) {


        if (
            ubicacionUsuario
        ) {

            const origen =
                `${ubicacionUsuario[0]},${ubicacionUsuario[1]}`;


            const destino =
                `${lat},${lng}`;


            window.open(

                `https://www.google.com/maps/dir/?api=1&origin=${origen}&destination=${destino}`,

                "_blank"

            );

        } else {


            window.open(

                `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,

                "_blank"

            );

        }

    };



    /* =====================================================
       BÚSQUEDA
    ===================================================== */

    searchInput.addEventListener(
        "input",
        aplicarFiltros
    );


    departmentFilter.addEventListener(
        "change",
        aplicarFiltros
    );



    function aplicarFiltros() {


        const texto =
            searchInput.value
                .toLowerCase()
                .trim();


        const departamento =
            departmentFilter.value;


        const resultado =
            sucursales.filter(
                function (sucursal) {


                    const coincideNombre =
                        sucursal.nombre
                            .toLowerCase()
                            .includes(texto);


                    const coincideDepartamento =
                        departamento === "Todas" ||
                        sucursal.departamento ===
                            departamento;


                    return (
                        coincideNombre &&
                        coincideDepartamento
                    );

                }
            );


        cargarMapa(resultado);

        cargarLista(resultado);

    }



    /* =====================================================
       UBICACIÓN
    ===================================================== */

    btnLocate.addEventListener(
        "click",
        function () {


            if (
                !navigator.geolocation
            ) {

                alert(
                    "Tu navegador no permite obtener tu ubicación."
                );

                return;

            }


            navigator.geolocation.getCurrentPosition(

                function (pos) {


                    ubicacionUsuario = [

                        pos.coords.latitude,

                        pos.coords.longitude

                    ];


                    L.marker(
                        ubicacionUsuario
                    )
                        .addTo(map)
                        .bindPopup(
                            "📍 Tu ubicación"
                        )
                        .openPopup();


                    map.setView(
                        ubicacionUsuario,
                        13,
                        {
                            animate: true
                        }
                    );


                    branchPanel.classList.remove(
                        "open"
                    );

                    toggleBranches.classList.remove(
                        "active"
                    );

                },


                function () {

                    alert(
                        "No pudimos obtener tu ubicación."
                    );

                }

            );

        }
    );



    /* =====================================================
       RESET
    ===================================================== */

    btnReset.addEventListener(
        "click",
        function () {


            searchInput.value =
                "";


            departmentFilter.value =
                "Todas";


            map.setView(
                [13.6929, -89.2182],
                8,
                {
                    animate: true
                }
            );


            cargarMapa(
                sucursales
            );


            cargarLista(
                sucursales
            );

        }
    );



    /* =====================================================
       INICIALIZAR
    ===================================================== */

    cargarMapa(
        sucursales
    );


    cargarLista(
        sucursales
    );


});