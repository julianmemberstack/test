document.addEventListener("DOMContentLoaded", function() {
    const forms = document.querySelectorAll('[ms-code="form2"]');
    forms.forEach(form => {
      const jsonList = form.getAttribute('ms-code-json-list');
      const jsonGroup = form.getAttribute('ms-code-json-list').replace(/s$/, '');
  
      form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission
  
        const memberstack = window.$memberstackDom;
  
        // Retrieve the current member JSON data
        const member = await memberstack.getMemberJSON();
  
        // Check if member.data exists and if it doesn't, create it
        if (!member.data) {
          member.data = {};
        }
  
        // Create a new group if it doesn't already exist
        if (!member.data[jsonList]) {
          member.data[jsonList] = {};
        }
  
        // Generate a unique key for the new item
        const timestamp = Date.now();
        const newItemKey = `${jsonGroup}-${timestamp}`;
  
        // Retrieve the input values from the form
        const inputs = form.querySelectorAll('[ms-code-json-name]');
        const newItemData = {};
        inputs.forEach(input => {
          const jsonName = input.getAttribute('ms-code-json-name');
          newItemData[jsonName] = input.value;
        });
  
        // Add the new item to the group
        member.data[jsonList][newItemKey] = newItemData;
  
        // Update the member JSON with the new data
        await memberstack.updateMemberJSON({
          json: member.data
        });
  
        // Reset the form inputs
        form.reset();
      });
    });
  });

document.addEventListener("DOMContentLoaded", async function() {
    const memberstack = window.$memberstackDom;
  
    // Function to display nested/sub items
    const displayNestedItems = async function(printList) {
      const jsonGroup = printList.getAttribute('ms-code-print-list');
      const placeholder = printList.querySelector(`[ms-code-print-item="${jsonGroup}"]`);
      if (!placeholder) return;
  
      const itemTemplate = placeholder.outerHTML;
      const itemContainer = document.createElement('div'); // Create a new container for the items
  
      const member = await memberstack.getMemberJSON();
      const items = member.data && member.data[jsonGroup] ? Object.values(member.data[jsonGroup]) : [];
      if (items.length === 0) return; // If no items, exit the function
  
      items.forEach(item => {
        if (Object.keys(item).length === 0) return;
  
        const newItem = document.createElement('div');
        newItem.innerHTML = itemTemplate;
        const itemElements = newItem.querySelectorAll('[ms-code-item-text]');
        itemElements.forEach(itemElement => {
          const jsonKey = itemElement.getAttribute('ms-code-item-text');
          const value = item && item[jsonKey] ? item[jsonKey] : '';
          itemElement.textContent = value;
        });
  
        // Add item key attribute
        const itemKey = Object.keys(member.data[jsonGroup]).find(k => member.data[jsonGroup][k] === item);
        newItem.firstChild.setAttribute('ms-code-item-key', itemKey);
  
        itemContainer.appendChild(newItem.firstChild);
      });
  
      // Replace the existing list with the new items
      printList.innerHTML = itemContainer.innerHTML;
    };
  
    // Call displayNestedItems function on initial page load for each instance
    const printLists = document.querySelectorAll('[ms-code-print-list]');
    printLists.forEach(printList => {
      displayNestedItems(printList);
    });
  
    // Add click event listener to elements with ms-code-update="json"
    const updateButtons = document.querySelectorAll('[ms-code-update="json"]');
    updateButtons.forEach(button => {
      button.addEventListener("click", async function() {
        // Add a delay of 500ms
        await new Promise(resolve => setTimeout(resolve, 500));
        printLists.forEach(printList => {
          displayNestedItems(printList);
        });
      });
    });
  });

  