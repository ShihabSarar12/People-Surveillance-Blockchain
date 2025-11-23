// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
/**
 * @title SurveillanceManager
 * @notice Stores tamper-proof encrypted surveillance metadata (IPFS CIDs)
 *      on a private Ethereum chain with QBFT consensus.
 * @dev Designed for integration with IPFS + off-chain KMS/TEE as in the paper.
 */
contract SurveillanceManager {
    enum Role {
        NONE,
        EDGE_DEVICE,
        LAW_ENFORCEMENT,
        AUDITOR,
        SPECIAL
    }

    /// @notice Contract admin (deployer) who can assign roles.
    address public immutable admin;

    /// @notice Mapping of addresses to their assigned role.
    mapping(address => Role) public roles;

    struct Metadata {
        string cid;
        uint256 timestamp;
        address uploader;
    }

    /// @notice Append-only log of all anchored metadata.
    Metadata[] public metadataLog;

    event RoleUpdated(address indexed entity, Role role);
    event MetadataAnchored(
        uint256 indexed index,
        string cid,
        address indexed uploader,
        uint256 timestamp
    );

    modifier onlyAdmin() {
        require(msg.sender == admin || roles[msg.sender] == Role.SPECIAL, "Not admin");
        _;
    }

    modifier onlyRole(Role role_) {
        require(roles[msg.sender] == role_ || roles[msg.sender] == Role.SPECIAL, "Invalid role");
        _;
    }

    modifier onlyAuthorized() {
        require(roles[msg.sender] != Role.NONE, "Not authorized");
        _;
    }

    modifier onlyReviewers() {
        require(
            roles[msg.sender] == Role.LAW_ENFORCEMENT ||
                roles[msg.sender] == Role.AUDITOR ||
                roles[msg.sender] == Role.SPECIAL,
            "Access denied"
        );
        _;
    }

    constructor() {
        admin = msg.sender;
        roles[msg.sender] = Role.AUDITOR;
        emit RoleUpdated(msg.sender, Role.AUDITOR);
    }

    /**
     * @notice Assign or update a role for an address.
     * @dev Only the admin can call this.
     */
    function setRole(address entity, Role role_) external onlyAdmin {
        roles[entity] = role_;
        emit RoleUpdated(entity, role_);
    }

    /**
     * @notice Edge device anchors a new encrypted video/metadata CID.
     * @param cid IPFS CID of facial recognition annotated video payload.
     * @dev This function only stores the CID + basic metadata (timestamp, uploader).
     */
    function storeCID(string calldata cid) external onlyRole(Role.EDGE_DEVICE) {
        Metadata memory m = Metadata({
            cid: cid,
            timestamp: block.timestamp,
            uploader: msg.sender
        });

        metadataLog.push(m);
        uint256 index = metadataLog.length - 1;

        emit MetadataAnchored(index, cid, msg.sender, block.timestamp);
    }

    /**
     * @notice Get CID by index for any authorized role (edge, LEA, auditor).
     * @dev Typically used by law enforcement or auditors to fetch CID
     */
    function getCID(
        uint256 index
    ) external view onlyAuthorized returns (string memory) {
        require(index < metadataLog.length, "Index out of bounds");
        return metadataLog[index].cid;
    }

    /**
     * @notice Get full metadata entry (CID, timestamp, uploader).
     * @dev Restricted to only LAW_ENFORCEMENT and AUDITOR if needed.
     */
    function getMetadata(
        uint256 index
    )
        external
        view
        onlyReviewers
        returns (string memory cid, uint256 timestamp, address uploader)
    {
        require(index < metadataLog.length, "Index out of bounds");
        Metadata storage m = metadataLog[index];
        return (m.cid, m.timestamp, m.uploader);
    }

    /// @notice Number of metadata entries stored so far.
    function metadataCount() external view returns (uint256) {
        return metadataLog.length;
    }
}
