document.addEventListener("DOMContentLoaded", () => {
  loadPage('home').then(activateButton)
})

const dbPromise = idb.open("rt", 1, function (upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("pemilihan")) {
    const peopleOS = upgradeDb.createObjectStore("pemilihan", {
      keyPath: "id",
      autoIncrement: true
    });
  }
});

const calculateProcess = () => {
  return new Promise((resolve, reject) => {
    const usia = document.querySelector("#usia").value / 100
    const pendapatan = document.querySelector("#pendapatan").value
    const tanggungan = document.querySelector("#tanggungan").value

    const usia2 = document.querySelector("#usia2").value / 100
    const pendapatan2 = document.querySelector("#pendapatan2").value
    const tanggungan2 = document.querySelector("#tanggungan2").value

    const usia3 = document.querySelector("#usia3").value / 100
    const pendapatan3 = document.querySelector("#pendapatan3").value
    const tanggungan3 = document.querySelector("#tanggungan3").value

    const base = [
      1, 2, 2,
      0.5, 1, 4,
      0.5, 0.25, 1
    ]

    const normalizedBase = [
      base[0] / (base[0] + base[3] + base[6]), base[1] / (base[1] + base[4] + base[7]), base[2] / (base[2] + base[5] + base[8]),
      base[3] / (base[0] + base[3] + base[6]), base[4] / (base[1] + base[4] + base[7]), base[5] / (base[2] + base[5] + base[8]),
      base[6] / (base[0] + base[3] + base[6]), base[7] / (base[1] + base[4] + base[7]), base[8] / (base[2] + base[5] + base[8])
    ]

    ////////////////////////////////

    //orang 1, orang2, orang3
    const calUsia = [
      usia / usia, usia / usia2, usia / usia3, //o1
      usia2 / usia, usia2 / usia2, usia2 / usia3, //o2
      usia3 / usia, usia3 / usia2, usia3 / usia3 //o3
    ]

    const normalizedUsia = [
      calUsia[0] / (calUsia[0] + calUsia[3] + calUsia[6]), calUsia[1] / (calUsia[1] + calUsia[4] + calUsia[7]), calUsia[2] / (calUsia[2] + calUsia[5] + calUsia[8]),
      calUsia[3] / (calUsia[0] + calUsia[3] + calUsia[6]), calUsia[4] / (calUsia[1] + calUsia[4] + calUsia[7]), calUsia[5] / (calUsia[2] + calUsia[5] + calUsia[8]),
      calUsia[6] / (calUsia[0] + calUsia[3] + calUsia[6]), calUsia[7] / (calUsia[1] + calUsia[4] + calUsia[7]), calUsia[8] / (calUsia[2] + calUsia[5] + calUsia[8])
    ]


    ////////////////////////////////

    //orang 1, orang2, orang3
    const calExp = [
      pendapatan / pendapatan, pendapatan / pendapatan2, pendapatan / pendapatan3, //o1
      pendapatan2 / pendapatan, pendapatan2 / pendapatan2, pendapatan2 / pendapatan3, //o2
      pendapatan3 / pendapatan, pendapatan3 / pendapatan2, pendapatan3 / pendapatan3 //o3
    ]

    const normalizedExp = [
      calExp[0] / (calExp[0] + calExp[3] + calExp[6]), calExp[1] / (calExp[1] + calExp[4] + calExp[7]), calExp[2] / (calExp[2] + calExp[5] + calExp[8]),
      calExp[3] / (calExp[0] + calExp[3] + calExp[6]), calExp[4] / (calExp[1] + calExp[4] + calExp[7]), calExp[5] / (calExp[2] + calExp[5] + calExp[8]),
      calExp[6] / (calExp[0] + calExp[3] + calExp[6]), calExp[7] / (calExp[1] + calExp[4] + calExp[7]), calExp[8] / (calExp[2] + calExp[5] + calExp[8])
    ]


    ////////////////////////////////

    //orang1, orang2, orang3
    const calKhar = [
      tanggungan / tanggungan, tanggungan / tanggungan2, tanggungan / tanggungan3, //o1
      tanggungan2 / tanggungan, tanggungan2 / tanggungan2, tanggungan2 / tanggungan3, //o2
      tanggungan3 / tanggungan, tanggungan3 / tanggungan2, tanggungan3 / tanggungan3 //o3
    ]

    const normalizedKhar = [
      calKhar[0] / (calKhar[0] + calKhar[3] + calKhar[6]), calKhar[1] / (calKhar[1] + calKhar[4] + calKhar[7]), calKhar[2] / (calKhar[2] + calKhar[5] + calKhar[8]),
      calKhar[3] / (calKhar[0] + calKhar[3] + calKhar[6]), calKhar[4] / (calKhar[1] + calKhar[4] + calKhar[7]), calKhar[5] / (calKhar[2] + calKhar[5] + calKhar[8]),
      calKhar[6] / (calKhar[0] + calKhar[3] + calKhar[6]), calKhar[7] / (calKhar[1] + calKhar[4] + calKhar[7]), calKhar[8] / (calKhar[2] + calKhar[5] + calKhar[8])
    ]



    //////////////////////////////
    const baseCriteria = [
      (normalizedBase[0] + normalizedBase[1] + normalizedBase[2]) / 3,
      (normalizedBase[3] + normalizedBase[4] + normalizedBase[5]) / 3,
      (normalizedBase[6] + normalizedBase[7] + normalizedBase[8]) / 3,
    ]

    const ageCriteria = [
      (normalizedUsia[0] + normalizedUsia[1] + normalizedUsia[2]) / 3,
      (normalizedUsia[3] + normalizedUsia[4] + normalizedUsia[5]) / 3,
      (normalizedUsia[6] + normalizedUsia[7] + normalizedUsia[8]) / 3,
    ]

    const expCriteria = [
      (normalizedExp[0] + normalizedExp[1] + normalizedExp[2]) / 3,
      (normalizedExp[3] + normalizedExp[4] + normalizedExp[5]) / 3,
      (normalizedExp[6] + normalizedExp[7] + normalizedExp[8]) / 3,
    ]

    const kharCriteria = [
      (normalizedKhar[0] + normalizedKhar[1] + normalizedKhar[2]) / 3,
      (normalizedKhar[3] + normalizedKhar[4] + normalizedKhar[5]) / 3,
      (normalizedKhar[6] + normalizedKhar[7] + normalizedKhar[8]) / 3,
    ]


    const hasilAkhir = [
      (ageCriteria[0] * baseCriteria[0]) + (expCriteria[0] * baseCriteria[1]) + (kharCriteria[0] * baseCriteria[2]),
      (ageCriteria[1] * baseCriteria[0]) + (expCriteria[1] * baseCriteria[1]) + (kharCriteria[1] * baseCriteria[2]),
      (ageCriteria[2] * baseCriteria[0]) + (expCriteria[2] * baseCriteria[1]) + (kharCriteria[2] * baseCriteria[2]),
    ]

    resolve(hasilAkhir)
  })
}


const activateButton = () => {
  const calculateButton = document.querySelector("#calculate")
  calculateButton.addEventListener("click", () => {
    calculateButton.innerHTML =
      `<div class="spinner-border spinner-border-sm text-light" role="status">
              <span class="sr-only">Loading...</span>
          </div>`

    setTimeout(() => {
      calculateButton.innerHTML = `<i class="fa fa-edit mr-2"></i>Hitung Nilai`

      calculateProcess().then((result) => {
        const resArea = document.querySelector("#result")
        resArea.innerHTML =
          `
                <p>Hasil : </p>
                <ul>
              `

        let max = 0,
          x = 0;
        result.forEach((res) => {
          resArea.innerHTML += `<li>${res}</li>`
          if (res == Math.max.apply(Math, result))
            max = x
          x++
        })

        resArea.innerHTML +=
          `
                </ul>
                <p>Kandidat terbaik adalah data ke-${max+1} dengan nilai : ${Math.max.apply(Math, result)}
              `
        dbPromise.then((db) => {
          const tx = db.transaction("pemilihan", "readwrite");
          const store = tx.objectStore("pemilihan");
          store.put(data);
          console.log(data)
          return tx.complete;
        })
      })

    }, 1000)
  })
}

const showEmployee = () => {

}

const navs = document.querySelectorAll(".nav-spa")
navs.forEach((nav) => {
  nav.addEventListener("click", () => {
    const page = nav.getAttribute("id")
    if (page == "home")
      loadPage(page).then(activateButton)
    else
      loadPage(page).then(showEmployee)
  })
})

const loadPage = (page) => {
  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        let content = document.querySelector("#konten");
        if (this.status == 200)
          content.innerHTML = this.responseText
        else if (this.status == 404)
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        else
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";

        resolve(content)
      }
    };

    xhttp.open("GET", `page/${page}.html`, true);
    xhttp.send();
  })
}