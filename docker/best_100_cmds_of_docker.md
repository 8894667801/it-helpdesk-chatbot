# 🐳 Docker – Top ~100 Most‑Used Commands & Why They’re Used

*(L1 → L3 Support Ready)*

***

## ✅ 1. Docker Info & Environment (Foundational)

1.  **`docker version`**  
    👉 *Why*: Verify Docker client/server versions.

2.  **`docker info`**  
    👉 *Why*: Full Docker system status, storage, runtime, driver info.

3.  **`docker context ls`**  
    👉 *Why*: List Docker environments (local, remote).

4.  **`docker context use`**  
    👉 *Why*: Switch between Docker environments.

***

## ✅ 2. Image Management Commands

5.  **`docker images`**  
    👉 *Why*: List locally available images.

6.  **`docker pull IMAGE`**  
    👉 *Why*: Download image from Docker Hub/private registry.

7.  **`docker push IMAGE`**  
    👉 *Why*: Upload image to registry (CI/CD, sharing).

8.  **`docker rmi IMAGE`**  
    👉 *Why*: Remove unused images, free disk space.

9.  **`docker image prune`**  
    👉 *Why*: Remove dangling images.

10. **`docker image prune -a`**  
    👉 *Why*: Remove ALL unused images (L3 cleanup).

11. **`docker image inspect IMAGE`**  
    👉 *Why*: View image metadata, layers, env vars.

12. **`docker history IMAGE`**  
    👉 *Why*: Analyze image layers & size growth.

13. **`docker save IMAGE`**  
    👉 *Why*: Export image to tar file.

14. **`docker load`**  
    👉 *Why*: Import image from tar file.

15. **`docker tag IMAGE`**  
    👉 *Why*: Version control & registry tagging.

***

## ✅ 3. Container Lifecycle Commands (Core L1)

16. **`docker run IMAGE`**  
    👉 *Why*: Create + start container.

17. **`docker ps`**  
    👉 *Why*: List running containers.

18. **`docker ps -a`**  
    👉 *Why*: List all containers (including stopped).

19. **`docker start CONTAINER`**  
    👉 *Why*: Start stopped container.

20. **`docker stop CONTAINER`**  
    👉 *Why*: Graceful shutdown.

21. **`docker restart CONTAINER`**  
    👉 *Why*: Restart container after config changes.

22. **`docker rm CONTAINER`**  
    👉 *Why*: Delete unused container.

23. **`docker rm -f CONTAINER`**  
    👉 *Why*: Force remove stuck containers.

24. **`docker rename`**  
    👉 *Why*: Rename containers for clarity.

***

## ✅ 4. Container Debugging (L1 → L2)

25. **`docker logs CONTAINER`**  
    👉 *Why*: View application logs (primary debugging command).

26. **`docker logs -f CONTAINER`**  
    👉 *Why*: Live log streaming.

27. **`docker exec -it CONTAINER bash`**  
    👉 *Why*: Enter running container shell.

28. **`docker attach CONTAINER`**  
    👉 *Why*: Attach STDOUT/STDIN for debugging.

29. **`docker inspect CONTAINER`**  
    👉 *Why*: Deep container config & networking analysis.

30. **`docker diff CONTAINER`**  
    👉 *Why*: See filesystem changes inside container.

***

## ✅ 5. Resource & Performance Monitoring (L2)

31. **`docker stats`**  
    👉 *Why*: Real‑time CPU, memory, network usage.

32. **`docker top CONTAINER`**  
    👉 *Why*: View processes inside a container.

33. **`docker events`**  
    👉 *Why*: Track Docker lifecycle events.

34. **`docker inspect --format`**  
    👉 *Why*: Extract specific fields (L3 automation).

***

## ✅ 6. Volume & Persistent Storage

35. **`docker volume create`**  
    👉 *Why*: Create persistent storage.

36. **`docker volume ls`**  
    👉 *Why*: List volumes.

37. **`docker volume inspect`**  
    👉 *Why*: Verify mount paths.

38. **`docker volume rm`**  
    👉 *Why*: Remove unused volumes.

39. **`docker volume prune`**  
    👉 *Why*: Cleanup unused volumes safely.

40. **`docker run -v`**  
    👉 *Why*: Mount volume to container.

41. **`docker run --mount`**  
    👉 *Why*: Safer & explicit volume mounting.

***

## ✅ 7. Docker Networking

42. **`docker network ls`**  
    👉 *Why*: List Docker networks.

43. **`docker network create`**  
    👉 *Why*: Custom container networking.

44. **`docker network inspect`**  
    👉 *Why*: Debug connectivity issues.

45. **`docker network rm`**  
    👉 *Why*: Remove unused networks.

46. **`docker network prune`**  
    👉 *Why*: Cleanup unused networks.

47. **`docker run -p HOST:CONTAINER`**  
    👉 *Why*: Expose container service externally.

***

## ✅ 8. Dockerfile & Build (DevOps Core)

48. **`docker build`**  
    👉 *Why*: Build image from Dockerfile.

49. **`docker build -t`**  
    👉 *Why*: Name & version images.

50. **`docker build --no-cache`**  
    👉 *Why*: Force clean builds.

51. **`docker buildx build`**  
    👉 *Why*: Multi‑arch images (ARM/x86).

52. **`docker commit CONTAINER`**  
    👉 *Why*: Create image from running container (debug only).

***

## ✅ 9. Docker Compose (Multi‑Container Apps)

53. **`docker-compose up`**  
    👉 *Why*: Start full application stack.

54. **`docker-compose up -d`**  
    👉 *Why*: Run stack in background.

55. **`docker-compose down`**  
    👉 *Why*: Stop & remove stack cleanly.

56. **`docker-compose ps`**  
    👉 *Why*: Service status check.

57. **`docker-compose logs`**  
    👉 *Why*: Centralized logs.

58. **`docker-compose restart`**  
    👉 *Why*: Restart services.

59. **`docker-compose build`**  
    👉 *Why*: Rebuild images after changes.

***

## ✅ 10. System Cleanup & Disk Management (L3)

60. **`docker system df`**  
    👉 *Why*: Docker disk usage report.

61. **`docker system prune`**  
    👉 *Why*: Remove unused Docker data.

62. **`docker system prune -a`**  
    👉 *Why*: Aggressive cleanup (L3).

63. **`docker container prune`**  
    👉 *Why*: Remove stopped containers.

64. **`docker image prune`**  
    👉 *Why*: Remove unused images.

65. **`docker builder prune`**  
    👉 *Why*: Cleanup build cache.

***

## ✅ 11. Security & Runtime Control (Advanced)

66. **`docker run --user`**  
    👉 *Why*: Run container as non‑root.

67. **`docker run --read-only`**  
    👉 *Why*: Improve container security.

68. **`docker run --cap-drop`**  
    👉 *Why*: Drop Linux capabilities.

69. **`docker run --restart=always`**  
    👉 *Why*: Auto‑recover services.

70. **`docker run --memory`**  
    👉 *Why*: Prevent OOM issues.

71. **`docker run --cpus`**  
    👉 *Why*: CPU throttling.

***

## ✅ 12. Troubleshooting & Diagnostics Tools

72. **`docker wait`**  
    👉 *Why*: Wait for container exit.

73. **`docker pause`**  
    👉 *Why*: Freeze container execution.

74. **`docker unpause`**  
    👉 *Why*: Resume container.

75. **`docker stats --no-stream`**  
    👉 *Why*: One‑time resource snapshot.

76. **`docker inspect --size`**  
    👉 *Why*: Inspect container size growth.

***

## ✅ 13. Registry & Auth

77. **`docker login`**  
    👉 *Why*: Authenticate to registry.

78. **`docker logout`**  
    👉 *Why*: Remove credentials.

79. **`docker search IMAGE`**  
    👉 *Why*: Search Docker Hub.

***

## ✅ 14. Swarm / Node Commands (Optional Enterprise)

80. **`docker node ls`**  
    👉 *Why*: List swarm nodes.

81. **`docker service ls`**  
    👉 *Why*: List services.

82. **`docker service ps`**  
    👉 *Why*: Service task status.

***

## ✅ 15. Misc / Utility

83. **`docker cp`**  
    👉 *Why*: Transfer files host ↔ container.

84. **`docker logs --since`**  
    👉 *Why*: Filter logs by time.

85. **`docker stats CONTAINER`**  
    👉 *Why*: Isolate resource issue.

86. **`docker exec env`**  
    👉 *Why*: Check env vars.

87. **`docker inspect network`**  
    👉 *Why*: DNS debugging.

88. **`docker ps --filter`**  
    👉 *Why*: Target containers quickly.

89. **`docker run --env-file`**  
    👉 *Why*: Secure config injection.

90. **`docker run --health-cmd`**  
    👉 *Why*: App health monitoring.

91. **`docker inspect .State.Health`  **
    👉 *Why*: Health‑check debugging.

92. **`docker run --log-driver`**  
    👉 *Why*: Integrate logging systems.

93. **`docker events --since`**  
    👉 *Why*: RCA timeline.

94. **`docker info | grep`**  
    👉 *Why*: Validate runtime state.

95. **`docker run --entrypoint`**  
    👉 *Why*: Override entrypoint for debugging.

96. **`docker build --target`**  
    👉 *Why*: Multi‑stage builds.

97. **`docker run --name`**  
    👉 *Why*: Predictable container naming.

98. **`docker inspect Mounts`**  
    👉 *Why*: Volume debugging.

99. **`docker inspect NetworkSettings`**  
    👉 *Why*: Networking RCA.

100.    **`docker system events`**  
        👉 *Why*: Production incident monitoring.
