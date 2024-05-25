# 🎨 Checklist Frontend

A dynamic frontend application for managing checklists and templates. This project utilizes the backend Checklist API for data operations, provides a drag-and-drop interface, and includes a form generator for JSON processing and design.

## 🌟 Features

- Interactive drag-and-drop interface for managing checklists and templates.
- Form generation based on JSON schema.
- Seamless integration with the backend Checklist API.
- Responsive design for various devices.

## 📁 Project Structure

```
project-frontend
│   package.json
│   README.md
└───public
│       index.html
└───src
    ├───components
    │       ChecklistForm.js
    │       ChecklistItem.js
    │       TemplateForm.js
    ├───hooks
    │       useFetch.js
    ├───pages
    │       Checklists.js
    │       Templates.js
    ├───styles
    │       App.css
    └───utils
            api.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm (or yarn)
- A running instance of the Checklist API

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/checklist-frontend.git
    cd checklist-frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your API base URL:
    ```
    REACT_APP_API_BASE_URL=http://localhost:3001
    ```

4. Start the development server:
    ```sh
    npm start
    ```

## 🔌 API Integration

### Endpoints Used

- **Templates**
  - **GET** `/data` - Retrieve all templates
  - **POST** `/data` - Create a new template
  - **PUT** `/data/:id` - Update a template by ID
  - **DELETE** `/data/:id` - Delete a template by ID

- **Checklists**
  - **GET** `/checklists` - Retrieve all checklists
  - **GET** `/checklists/:id` - Retrieve a checklist by ID
  - **POST** `/checklists` - Create a new checklist
  - **PUT** `/checklists/:id` - Update a checklist by ID
  - **DELETE** `/checklists/:id` - Delete a checklist by ID

## 📋 Components

### ChecklistForm

Generates a form based on JSON schema for creating and editing checklists.

```javascript
// src/components/ChecklistForm.js
import React, { useState } from 'react';

const ChecklistForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Generate form fields based on formData structure */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ChecklistForm;
```

### ChecklistItem

Renders an individual checklist item, with drag-and-drop functionality.

```javascript
// src/components/ChecklistItem.js
import React from 'react';

const ChecklistItem = ({ item, onDragStart }) => {
  return (
    <div draggable onDragStart={() => onDragStart(item)}>
      {item.name}
    </div>
  );
};

export default ChecklistItem;
```

### TemplateForm

Generates a form based on JSON schema for creating and editing templates.

```javascript
// src/components/TemplateForm.js
import React, { useState } from 'react';

const TemplateForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Generate form fields based on formData structure */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default TemplateForm;
```

## 📜 Custom Hooks

### useFetch

A custom hook for fetching data from the API.

```javascript
// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
```

## 🎨 Styling

Custom styles for the application.

```css
/* src/styles/App.css */
body {
  font-family: Arial, sans-serif;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License.

## 💬 Contact

For any inquiries, please reach out at djayashanka750@gmail.com
