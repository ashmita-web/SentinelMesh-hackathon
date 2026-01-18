// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SecurityLog {
    struct Log {
        string user;
        string eventType;
        uint timestamp;
    }

    Log[] public logs;

    function addLog(string memory user, string memory eventType) public {
        logs.push(Log(user, eventType, block.timestamp));
    }

    function getLog(uint index) public view returns (string memory, string memory, uint) {
        Log memory log = logs[index];
        return (log.user, log.eventType, log.timestamp);
    }

    function getLogsCount() public view returns (uint) {
        return logs.length;
    }
}
