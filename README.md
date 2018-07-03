# NodeBB Chevereto Uploads Plugin

| Dependency     | Version Requirement     |
| -------------- |:-----------------------:|
| NodeBB         | >= 0.3.2 or [a909a253](https://github.com/designcreateplay/NodeBB/commit/a909a253931c20427c14c777c1bb6629a79d449d) |

A plugin for NodeBB to take image uploads and store them on Chevereto, uses the `filter:uploadImage` hook in NodeBB. 


## Configuration

Modify your config.json

```json
{
  "...": "...",
  "chevereto": {
    "site_url": "https://example.com",
    "key": "your_api_key"
  },
  "...": "..."
}
```
