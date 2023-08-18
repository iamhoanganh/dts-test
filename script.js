document.addEventListener("DOMContentLoaded", function () {
  const createArrayBtn = document.getElementById("createArrayBtn");
  const bubbleSortBtn = document.getElementById("bubbleSortBtn");
  const selectionSortBtn = document.getElementById("selectionSortBtn");
  const insertionSortBtn = document.getElementById("insertionSortBtn");
  const quickSortBtn = document.getElementById("quickSortBtn");
  const mergeSortBtn = document.getElementById("mergeSortBtn");
  const arrayDisplay = document.getElementById("arrayDisplay");
  const sortedArraysDisplay = document.getElementById("sortedArraysDisplay");

  let array = [];
  let sortedArrays = [];

  createArrayBtn.addEventListener("click", createRandomArray);
  bubbleSortBtn.addEventListener("click", () => sortArray(bubbleSort));
  selectionSortBtn.addEventListener("click", () => sortArray(selectionSort));
  insertionSortBtn.addEventListener("click", () => sortArray(insertionSort));
  quickSortBtn.addEventListener("click", () => sortArray(quickSort));
  mergeSortBtn.addEventListener("click", () => sortArray(mergeSort));

  function createRandomArray() {
    array = Array.from({ length: 1000 }, () =>
      generateRandomString(Math.floor(Math.random() * 5) + 1)
    );
    arrayDisplay.textContent = "Array: " + array.join(", ");
    sortedArraysDisplay.textContent = "Sorted Arrays:";
    sortedArrays = [];
  }

  function generateRandomString(length) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  function sortArray(sortingFunc) {
    const startTime = performance.now();
    const sortedArray = sortingFunc(array.slice());
    const endTime = performance.now();

    sortedArrays.push(sortedArray);
    updateSortedArraysDisplay();

    console.log(`Sorting time: ${endTime - startTime} milliseconds`);
  }

  function updateSortedArraysDisplay() {
    sortedArraysDisplay.innerHTML =
      "Sorted Arrays:<br>" +
      sortedArrays.map((arr) => arr.join(", ")).join("<br>");
  }

  function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }

  function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      }
    }
    return arr;
  }

  function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
    return arr;
  }

  function quickSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
  }

  function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
  }

  function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
});
