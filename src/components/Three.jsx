import React, { useEffect, useState } from 'react';
import { Tree } from 'react-d3-tree';
import './App.css'; // Import the CSS file

// Utility function to transform the API response
const transformApiResponse = (apiResponse) => {
    // Assuming apiResponse is the root of the JSON object
    const checklist = apiResponse;
    const treeData = {
      name: checklist?.name ? checklist.name : 'Checklist',
      children: checklist?.groups.map((group) => ({
        name: group.groupName,
        children: checklist?.sections
          .filter((section) => section?.groupID === group?.groupID)
          .map((section) => ({
            name: section.sectionName,
          })),
      })),
    };
    return [treeData];
  };

const TreeComponent = ({ treeData }) => {
  const containerStyles = {
    width: '100%',
    height: '500px',
  };

  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const handleZoom = (e) => {
    setScale(e.transform.k);
    setTranslate({ x: e.transform.x, y: e.transform.y });
  };

  return (
    <div className="tree-container" style={containerStyles}>
      <Tree
        data={treeData}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        orientation="vertical"
        pathFunc={'step'}
        zoomable={true}
        draggable={true}
        enableLegacyTransitions={true}
        collapsible={true}
       // zoomable={true}
        //scaleExtent={{ min: 0.1, max: 2 }}
        //translate={translate}
        //onZoom={handleZoom}
        //zoom={scale}
      />
    </div>
  );
};

const Example = ({ apiResponse }) => {
    // Initialize state with the provided apiResponse
    const [treeData, setTreeData] = useState(apiResponse);
  
    useEffect(() => {
      // This useEffect will run only once when the component mounts
      // and it initializes the state with the provided apiResponse
      // You can add additional logic here if needed
    console.log(apiResponse);
      setTreeData(transformApiResponse(apiResponse));
    }, [apiResponse]); // Ensure useEffect runs only when apiResponse changes

  
    // Your component's logic and JSX here
  

  return (
    <div>
      {treeData ? <TreeComponent treeData={treeData} /> : <p>Loading...</p>}
    </div>
  );
};

export default  Example;
