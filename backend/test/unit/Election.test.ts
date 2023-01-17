import { network, getNamedAccounts, deployments, ethers } from "hardhat"
import { developmentChains, networkConfig } from "../../helper-hardhat-config"
import { assert, expect } from "chai"
import { Election } from "../../typechain-types"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Election unit test", async function () {
          let election: Election
          beforeEach(async () => {
              const { deployer } = await getNamedAccounts()
              await deployments.fixture(["all"])
              election = await ethers.getContract("Election", deployer)
          })
          describe("constructor", async function () {
              it("initialize the election correctly", async function () {
                  const electionState = await election.getElectionState()
                  assert.equal(electionState.toString(), "0")
              })
          })
          describe("first result", async function () {
              it("initialize the election correctly", async function () {
                  const result = await election.getResults()
                  assert.equal(result.toString(), "0")
              })
          })
      })
