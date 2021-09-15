//Test 1

const countShock = (arr) => {
    // Buat variabel awal untuk menampung hasil
    let result = 0;
    // Buat array untuk sementara menetapkan pasangan
    const pairs = [];
    // loop arraynya
    for (let i of arr) {
        // periksa apakah nilai saat ini sudah ada di array pairs atau tidak
        if (pairs[i]) {
            // jika nilai saat ini sudah ada di pairs hapus nilainya dan tambah pasangan
            delete pairs[i];
            result += 1;
        } else {
            // jika tidak tambahkan nilai saat ini ke array
            pairs[i] = i;
        }
    }
  
    return result;
  }
  
  console.log("Output Test 1 :");
  console.log(countShock([10, 20, 20, 10, 10, 30, 50, 10, 20]));
  console.log(countShock([6, 5, 2, 3, 5, 2, 2, 1, 1, 5, 1, 3, 3, 3, 5]));
  console.log(countShock([1, 1, 3, 1, 2, 1, 3, 3, 3, 3]));

  //Test 2

  const wordCount = (str) => {
    let arr = str.split(" ");
    //buat special char kecuali (. , ?) 
    const specialChar = /[!"`_'#%&:;<>=@{}~\$\(\)\*\+\/\\\[\]\^\|]+/;
    let result = 0;
    
    //lakukan perulangan untuk array tersebut
    for (let i = 0; i < arr.length; i++) {
      // jika ingin melihat hasil TRUE OR FALSE uncomment bari dibawah ini
      //console.log("Cek: ", specialChar.test(arr[i]));

      //cek apakah nilai dari special char false atau tidak
      if (!specialChar.test(arr[i])) {
        // tambah nilainya jika dia bernilai false
        result++;
      }
    }
    return result;
  };

  console.log("Output Test 2 :");
  console.log(wordCount("Saat meng*ecat tembok, Agung dib_antu oleh Raihan."));
  console.log(wordCount("Berapa u(mur minimal[ untuk !mengurus ktp?"));
  console.log(wordCount("Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda."));