// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 *       @author moah
 */

library Structs {
    struct User {
        address id;
        bool isValid;
        mapping(uint256 => UserVotes) votes;
    }

    struct UserVotes {
        uint256 electionId;
        string candidateName;
        bool isVoted;
    }

    struct Candidate {
        string candidateName;
        string description;
        string party;
        uint256 nominationNumber;
        uint256 numberOfWins;
    }

    struct Elction {
        uint256 electionId;
        string title;
        uint256 interval;
        string description;
        bool isClose;
        string[] candidateNames;
        mapping(string => candidateVote) votes;
        string winner;
    }

    struct candidateVote {
        string candidateNames;
        uint256 numOfVotes;
    }

    struct Table {
        uint256 electionId;
        string description;
        string winner;
    }
}
