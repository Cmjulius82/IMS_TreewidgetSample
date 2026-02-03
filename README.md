# React Tree Widget with react-arborist

A modern, virtualized tree widget component built with React and react-arborist, designed to handle large datasets efficiently with custom styling.

## Features

- **Virtual Scrolling**: Efficiently handles 1000+ tree nodes
- **Custom Styling**: Fully customizable appearance with CSS
- **Interactive**: Click to expand/collapse nodes
- **Icons**: File and folder icons for visual clarity
- **Responsive**: Works on different screen sizes
- **Performance**: Optimized rendering with virtualization

## Getting Started

The development server is already running at [http://localhost:5173/](http://localhost:5173/)

### Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Project Structure

```
tree-widget-app/
├── src/
│   ├── TreeWidget.jsx      # Main tree widget component
│   ├── TreeWidget.css      # Tree widget styles
│   ├── App.jsx             # App entry point
│   └── App.css             # App styles
├── package.json
└── README.md
```

## How It Works

### TreeWidget Component

The tree widget demonstrates:

1. **Data Structure**: Hierarchical data with nested children
2. **Virtualization**: Only renders visible nodes for performance
3. **Custom Node Renderer**: Customizable tree node appearance
4. **Large Dataset Support**: Sample data with 1000+ nodes

### Key Configuration Options

```javascript
<Tree
  data={data}              // Your tree data
  openByDefault={false}    // Start with collapsed nodes
  width={600}              // Tree width
  height={500}             // Tree height (enables virtualization)
  indent={24}              // Child node indentation
  rowHeight={36}           // Height of each row
/>
```

## Customization

### Adding Your Own Data

Update the `generateTreeData()` function in TreeWidget.jsx:

```javascript
const myData = [
  {
    id: "1",
    name: "My Root",
    children: [
      { id: "1-1", name: "Child 1" },
      { id: "1-2", name: "Child 2" },
    ],
  },
];
```

### Styling

Modify TreeWidget.css to customize:
- Node colors and hover effects
- Icons and spacing
- Selection states
- Borders and shadows

### Adding Features

react-arborist supports many additional features:
- Drag and drop reordering
- Multi-selection
- Search/filtering
- Keyboard navigation
- Edit inline
- Custom context menus

See the [react-arborist documentation](https://github.com/brimdata/react-arborist) for more details.

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **react-arborist**: Virtualized tree component library

## Next Steps

1. Replace sample data with your own dataset
2. Add drag-and-drop functionality
3. Implement search/filter capabilities
4. Add context menus for actions
5. Connect to an API for dynamic data
