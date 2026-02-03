import { useRef, useState, useEffect } from "react";
import { Tree } from "react-arborist";
import "./TreeWidget.css";

// Sample tree data with large dataset support
const getRandomStatus = () => {
  const statuses = ["In Progress", "Completed", "Under Review", "Cancelled"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomCreator = () => {
  const creators = [
    "John Smith", "Sarah Johnson", "Michael Chen", "Emily Davis",
    "David Wilson", "Lisa Anderson", "James Brown", "Maria Garcia",
    "Robert Taylor", "Jennifer Lee", "William Martinez", "Patricia Robinson"
  ];
  return creators[Math.floor(Math.random() * creators.length)];
};

const getRandomTimestamp = () => {
  const start = new Date(2025, 0, 1); // Jan 1, 2025
  const end = new Date(2026, 1, 3); // Feb 3, 2026
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  const month = String(randomDate.getMonth() + 1).padStart(2, '0');
  const day = String(randomDate.getDate()).padStart(2, '0');
  const year = randomDate.getFullYear();
  const hours = String(randomDate.getHours()).padStart(2, '0');
  const minutes = String(randomDate.getMinutes()).padStart(2, '0');

  return `${month}/${day}/${year} ${hours}:${minutes}`;
};

const createNodeName = (id) => {
  return `${id}, ${getRandomStatus()} was created by ${getRandomCreator()} on ${getRandomTimestamp()}`;
};

const generateTreeData = () => {
  const data = [
    {
      id: "1",
      name: createNodeName("MDG-OTP-0001-0000"),
      children: [
        { id: "1-1", name: createNodeName("MDG-OTP-0001-0001") },
        { id: "1-2", name: createNodeName("MDG-OTP-0001-0002") },
        { id: "1-3", name: createNodeName("MDG-OTP-0001-0003") },
        { id: "1-4", name: createNodeName("MDG-OTP-0001-0004") },
        { id: "1-5", name: createNodeName("MDG-OTP-0001-0005") },
      ],
    },
  ];

  // Generate more data for large dataset demonstration
  for (let i = 2; i <= 50; i++) {
    const categoryNum = i.toString().padStart(4, '0');
    data.push({
      id: `${i}`,
      name: createNodeName(`MDG-OTP-${categoryNum}-0000`),
      children: Array.from({ length: 20 }, (_, j) => {
        const itemNum = (j + 1).toString().padStart(4, '0');
        return {
          id: `${i}-${j}`,
          name: createNodeName(`MDG-OTP-${categoryNum}-${itemNum}`),
        };
      }),
    });
  }

  return data;
};

// Custom Node component for rendering tree items
function Node({ node, style, dragHandle }) {
  // Parse node name: "MDG-OTP-xxxx-xxxx, Status was created by Creator on MM/DD/YYYY HH:MM"
  const fullText = node.data.name;
  const [nodeName, rest] = fullText.split(', ');

  let status = '';
  let creator = '';
  let timestamp = '';

  if (rest) {
    const createdMatch = rest.match(/(.+?) was created by (.+?) on (.+)/);
    if (createdMatch) {
      status = createdMatch[1];
      creator = createdMatch[2];
      timestamp = createdMatch[3];
    }
  }

  return (
    <div
      style={style}
      ref={dragHandle}
      className={`tree-node ${node.isSelected ? 'selected' : ''}`}
      onClick={() => node.toggle()}
    >
      <div className="node-content">
        <span className="node-icon">
          {node.isOpen ? 'V' : '>'}
        </span>
        <span className="node-text">
          <span className="node-id">{nodeName}</span>
          {status && <span className="node-status">{status}</span>}
          {creator && (
            <span className="node-metadata">
              created by {creator} • {timestamp}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

function TreeWidget() {
  const initialData = generateTreeData();
  const [data, setData] = useState(initialData);
  const [selectedId, setSelectedId] = useState(null);
  const treeRef = useRef(null);

  const expandAll = () => {
    treeRef.current?.openAll();
  };

  const collapseAll = () => {
    treeRef.current?.closeAll();
  };

  // Simulate lazy loading of children
  const loadChildren = (nodeId) => {
    setData(prevData => {
      const updateNode = (nodes) => {
        return nodes.map(node => {
          if (node.id === nodeId && (!node.children || node.children.length === 0)) {
            // Generate lazy-loaded children with MDG-OTP-xxxx-xxxx format
            const childCount = Math.floor(Math.random() * 5) + 3; // 3-7 children

            // Extract base number from parent name and generate unique child IDs
            const baseNum = parseInt(nodeId.split('-').pop()) || 1;
            const startNum = baseNum * 100; // Create distinct ranges for children

            const newChildren = Array.from({ length: childCount }, (_, i) => {
              const childNum = (startNum + i + 1).toString().padStart(4, '0');
              const subNum = (i + 1).toString().padStart(4, '0');
              return {
                id: `${nodeId}-lazy-${i}`,
                name: createNodeName(`MDG-OTP-${childNum}-${subNum}`),
                children: [], // Empty array to allow further lazy loading
              };
            });
            return { ...node, children: newChildren };
          }
          if (node.children) {
            return { ...node, children: updateNode(node.children) };
          }
          return node;
        });
      };
      return updateNode(prevData);
    });
  };

  // Handle node selection with pan effect
  const handleSelect = (nodes) => {
    if (nodes.length > 0) {
      const selectedNode = nodes[0];
      setSelectedId(selectedNode.id);

      // Pan to selected node
      setTimeout(() => {
        selectedNode.scrollIntoView?.();
      }, 100);
    }
  };

  return (
    <div className="tree-widget-container">
      <h2>Sample IMS React Thread</h2>
      <p className="tree-description">
        virtualized and supports large datasets with lazy loading of children.
      </p>

      <div className="tree-controls">
        <button onClick={expandAll} className="tree-control-btn">
          <span className="control-icon">+</span> Expand All
        </button>
        <button onClick={collapseAll} className="tree-control-btn">
          <span className="control-icon">-</span> Collapse All
        </button>
      </div>

      <div className="tree-wrapper">
        <Tree
          ref={treeRef}
          data={data}
          openByDefault={false}
          width={600}
          height={500}
          indent={24}
          rowHeight={36}
          overscanCount={1}
          paddingTop={10}
          paddingBottom={10}
          onSelect={handleSelect}
          onToggle={(id) => loadChildren(id)}
        >
          {Node}
        </Tree>
      </div>

      <div className="tree-info">
        <p>Features demonstrated:</p>
        <ul>
          <li>✓ Virtual scrolling for large datasets (1000+ items)</li>
          <li>✓ </li>
          <li>✓ Collapsible/expandable nodes</li>
          <li>✓ Click to expand/collapse</li>
        </ul>
      </div>
    </div>
  );
}

export default TreeWidget;
