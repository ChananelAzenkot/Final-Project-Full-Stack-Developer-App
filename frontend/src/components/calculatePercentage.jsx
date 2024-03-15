export const calculatePercentageTV = (item, setItem) => {
  if (!item.numberCalls || isNaN(item.tvDisconnection) || isNaN(item.numberCalls)) {
    setItem(prevState => ({...prevState, simurTV: '0%', simurTVColor: 'red'}));
  } else if (item.numberCalls && !item.tvDisconnection) {
    setItem(prevState => ({...prevState, simurTV: '100%', simurTVColor: 'green'}));
  } else {
    const percentage = 1 - (parseFloat(item.tvDisconnection) / parseFloat(item.numberCalls));
    let color;
    if (percentage >= 0.79) {
      color = 'green';
    } else if (percentage >= 0.67) {
      color = 'yellow';
    } else {
      color = 'red';
    }
    setItem(prevState => ({...prevState, simurTV: (percentage * 100).toFixed(2) + '%', simurTVColor: color}));
  }
};

export const calculatePercentageFiber = (item, setItem) => {
  if (!item.numberCalls || isNaN(item.fiberDisconnection) || isNaN(item.numberCalls)) {
    setItem(prevState => ({...prevState, simurFiber: '0%', simurFiberColor: 'red'}));
  } else if (item.numberCalls && !item.fiberDisconnection) {
    setItem(prevState => ({...prevState, simurFiber: '100%', simurFiberColor: 'green'}));
  } else {
    const percentage = 1 - (parseFloat(item.fiberDisconnection) / parseFloat(item.numberCalls));
    let color;
    if (percentage >= 0.79) {
      color = 'green';
    } else if (percentage >= 0.67) {
      color = 'yellow';
    } else {
      color = 'red';
    }
    setItem(prevState => ({...prevState, simurFiber: (percentage * 100).toFixed(2) + '%', simurFiberColor: color}));
  }
};

export const calculatePercentageTVcreate = (formData, setFormData) => {
  if (!formData.numberCalls || isNaN(formData.tvDisconnection) || isNaN(formData.numberCalls)) {
    setFormData(prevState => ({...prevState, simurTV: '0%'}));
  } else if (formData.numberCalls && !formData.tvDisconnection) {
    setFormData(prevState => ({...prevState, simurTV: '100%'}));
  } else {
    const percentage = 1 - (parseFloat(formData.tvDisconnection) / parseFloat(formData.numberCalls));
    setFormData(prevState => ({...prevState, simurTV: (percentage * 100).toFixed(2) + '%'}));
  }
};

export const calculatePercentageFiberCreate = (formData, setFormData) => {
  if (!formData.numberCalls || isNaN(formData.fiberDisconnection) || isNaN(formData.numberCalls)) {
    setFormData(prevState => ({...prevState, simurFiber: '0%'}));
  } else if (formData.numberCalls && !formData.fiberDisconnection) {
    setFormData(prevState => ({...prevState, simurFiber: '100%'}));
  } else {
    const percentage = 1 - (parseFloat(formData.fiberDisconnection) / parseFloat(formData.numberCalls));
    setFormData(prevState => ({...prevState, simurFiber: (percentage * 100).toFixed(2) + '%'}));
  }
};